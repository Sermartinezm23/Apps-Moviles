import { TestBed } from '@angular/core/testing';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';
import { MyServicioService } from './myservicio.service';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  username: string;
  password: string;
}

interface Recipe {
  id: number;
  userId: number;
  name: string;
  ingredients: string[];
}

describe('MyServicioService', () => {
  let service: MyServicioService;
  let storageSpy: jasmine.SpyObj<Storage>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('Storage', ['create', 'get', 'set', 'remove']);

    await TestBed.configureTestingModule({
      imports: [IonicStorageModule.forRoot()],
      providers: [
        MyServicioService,
        { provide: Storage, useValue: spy }
      ]
    }).compileComponents();

    service = TestBed.inject(MyServicioService);
    storageSpy = TestBed.inject(Storage) as jasmine.SpyObj<Storage>;
    storageSpy.create.and.returnValue(Promise.resolve(storageSpy));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize storage', async () => {
    await service.init();
    expect(storageSpy.create).toHaveBeenCalled();
  });

  it('should add a new user', async () => {
    const mockUsers: User[] = [];
    storageSpy.get.and.returnValue(Promise.resolve(mockUsers));
    storageSpy.set.and.returnValue(Promise.resolve());

    const newUser = {
      firstName: 'Hugo',
      lastName: 'Alvarez',
      birthDate: '1990-01-01',
      username: 'Hugo23',
      password: '0987'
    };

    await service.addUser(newUser);

    expect(storageSpy.get).toHaveBeenCalledWith(service['userKey']);
    expect(storageSpy.set).toHaveBeenCalledWith(service['userKey'], jasmine.any(Array));
    const storedUsers = storageSpy.set.calls.mostRecent().args[1] as User[];
    expect(storedUsers.length).toBe(1);
    expect(storedUsers[0].username).toBe('Hugo23');
  });

  it('should get users', async () => {
    const mockUsers: User[] = [
      { id: 1, firstName: 'Hugo', lastName: 'Alvarez', birthDate: '1990-01-01', username: 'Hugo23', password: '0987' }
    ];
    storageSpy.get.and.returnValue(Promise.resolve(mockUsers));

    const users = await service.getUsers();

    expect(storageSpy.get).toHaveBeenCalledWith(service['userKey']);
    expect(users.length).toBe(1);
    expect(users[0].username).toBe('Hugo23');
  });

  it('should get a user by username and password', async () => {
    const mockUsers: User[] = [
      { id: 1, firstName: 'Hugo', lastName: 'Alvarez', birthDate: '1990-01-01', username: 'Hugo23', password: '0987' }
    ];
    storageSpy.get.and.returnValue(Promise.resolve(mockUsers));

    const user = await service.getUser('Hugo23', '0987');

    expect(storageSpy.get).toHaveBeenCalledWith(service['userKey']);
    expect(user).toBeTruthy();
    expect(user?.username).toBe('Hugo23');
  });

  it('should add a new recipe', async () => {
    const mockRecipes: Recipe[] = [];
    storageSpy.get.and.returnValue(Promise.resolve(mockRecipes));
    storageSpy.set.and.returnValue(Promise.resolve());

    const newRecipe = {
      name: 'Fideos con Salsa',
      ingredients: ['Fideos', 'Salsa']
    };

    await service.addRecipe(1, newRecipe);

    expect(storageSpy.get).toHaveBeenCalledWith(service['recipeKey']);
    expect(storageSpy.set).toHaveBeenCalledWith(service['recipeKey'], jasmine.any(Array));
    const storedRecipes = storageSpy.set.calls.mostRecent().args[1] as Recipe[];
    expect(storedRecipes.length).toBe(1);
    expect(storedRecipes[0].name).toBe('Fideos con Salsa');
  });

  it('should get recipes', async () => {
    const mockRecipes: Recipe[] = [
      { id: 1, userId: 1, name: 'Fideos con Salsa', ingredients: ['Fideos', 'Salsa'] }
    ];
    storageSpy.get.and.returnValue(Promise.resolve(mockRecipes));

    const recipes = await service.getRecipes();

    expect(storageSpy.get).toHaveBeenCalledWith(service['recipeKey']);
    expect(recipes.length).toBe(1);
    expect(recipes[0].name).toBe('Fideos con Salsa');
  });

  it('should get recipes by user id', async () => {
    const mockRecipes: Recipe[] = [
      { id: 1, userId: 1, name: 'Fideos con Salsa', ingredients: ['Fideos', 'Salsa'] },
      { id: 2, userId: 2, name: 'Sandwich', ingredients: ['Pan', 'Queso'] }
    ];
    storageSpy.get.and.returnValue(Promise.resolve(mockRecipes));

    const userRecipes = await service.getRecipesByUser(1);

    expect(storageSpy.get).toHaveBeenCalledWith(service['recipeKey']);
    expect(userRecipes.length).toBe(1);
    expect(userRecipes[0].name).toBe('Fideos con Salsa');
  });
});