import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MisRecetasPage } from './mis-recetas.page';
import { MyServicioService, User } from '../myservicio.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('MisRecetasPage', () => {
  let component: MisRecetasPage;
  let fixture: ComponentFixture<MisRecetasPage>;
  let myServicioSpy: jasmine.SpyObj<MyServicioService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(waitForAsync(() => {
    const spyMyServicio = jasmine.createSpyObj('MyServicioService', ['getUserFromSession', 'getRecipesByUser', 'saveRecipes']);
    const spyRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [MisRecetasPage],
      providers: [
        { provide: MyServicioService, useValue: spyMyServicio },
        { provide: Router, useValue: spyRouter }
      ],
      imports: [RouterTestingModule]
    }).compileComponents();

    myServicioSpy = TestBed.inject(MyServicioService) as jasmine.SpyObj<MyServicioService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisRecetasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load recipes on ngOnInit', async () => {
    const mockUser: User = { 
      id: 1, 
      firstName: 'Test', 
      lastName: 'User', 
      birthDate: '2000-01-01', 
      username: 'test30', 
      password: '1234' 
    };
    const mockRecipes = [{ id: 1, userId: 1, name: 'Test Recipe', ingredients: ['ingredient1'] }];
    
    myServicioSpy.getUserFromSession.and.returnValue(Promise.resolve(mockUser));
    myServicioSpy.getRecipesByUser.and.returnValue(Promise.resolve(mockRecipes));
    
    await component.ngOnInit();
    
    expect(myServicioSpy.getUserFromSession).toHaveBeenCalled();
    expect(myServicioSpy.getRecipesByUser).toHaveBeenCalledWith(1);
    expect(component.recipes).toEqual(mockRecipes);
  });

  it('should navigate to login if no user found', async () => {
    myServicioSpy.getUserFromSession.and.returnValue(Promise.resolve(null));
    
    await component.ngOnInit();
    
    expect(myServicioSpy.getUserFromSession).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should delete a recipe', async () => {
    component.recipes = [{ id: 1, userId: 1, name: 'Test Recipe', ingredients: ['ingredient1'] }];
    myServicioSpy.saveRecipes.and.returnValue(Promise.resolve());

    await component.deleteRecipe(0);

    expect(component.recipes.length).toBe(0);
    expect(myServicioSpy.saveRecipes).toHaveBeenCalledWith([]);
  });

  it('should load recipes on ionViewWillEnter', async () => {
    const mockUser: User = { 
      id: 1, 
      firstName: 'Test', 
      lastName: 'User', 
      birthDate: '2000-01-01', 
      username: 'test30', 
      password: '1234' 
    };
    const mockRecipes = [{ id: 1, userId: 1, name: 'Test Recipe', ingredients: ['ingredient1'] }];

    myServicioSpy.getUserFromSession.and.returnValue(Promise.resolve(mockUser));
    myServicioSpy.getRecipesByUser.and.returnValue(Promise.resolve(mockRecipes));

    await component.ionViewWillEnter();

    expect(myServicioSpy.getUserFromSession).toHaveBeenCalled();
    expect(myServicioSpy.getRecipesByUser).toHaveBeenCalledWith(1);
    expect(component.recipes).toEqual(mockRecipes);
  });
});