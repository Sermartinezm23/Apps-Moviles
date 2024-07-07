import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CrearRecetaPage } from './crear-receta.page';
import { NavController } from '@ionic/angular';
import { MyServicioService } from '../myservicio.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  username: string;
  password: string;
}

describe('CrearRecetaPage', () => {
  let component: CrearRecetaPage;
  let fixture: ComponentFixture<CrearRecetaPage>;
  let myServicioSpy: jasmine.SpyObj<MyServicioService>;
  let navCtrlSpy: jasmine.SpyObj<NavController>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(waitForAsync(() => {
    const myServicioMock = jasmine.createSpyObj('MyServicioService', ['getUserFromSession', 'addRecipe']);
    const navCtrlMock = jasmine.createSpyObj('NavController', ['navigateRoot']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [CrearRecetaPage],
      imports: [FormsModule],
      providers: [
        { provide: MyServicioService, useValue: myServicioMock },
        { provide: NavController, useValue: navCtrlMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    myServicioSpy = TestBed.inject(MyServicioService) as jasmine.SpyObj<MyServicioService>;
    navCtrlSpy = TestBed.inject(NavController) as jasmine.SpyObj<NavController>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearRecetaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to login if no user is found in session', async () => {
    myServicioSpy.getUserFromSession.and.returnValue(Promise.resolve(null));

    await component.createRecipe();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should add a new recipe and navigate to mis-recetas', async () => {
    const mockUser: User = {
      id: 1,
      firstName: 'Test',
      lastName: 'User',
      birthDate: '2000-01-01',
      username: 'test10',
      password: '1234'
    };
    myServicioSpy.getUserFromSession.and.returnValue(Promise.resolve(mockUser));
    myServicioSpy.addRecipe.and.returnValue(Promise.resolve());

    component.recipeName = 'Test Recipe';
    component.ingredients = ['Ingredient 1', 'Ingredient 2', '', '', '', '', '', '', '', '', '', '', '', '', ''];

    await component.createRecipe();

    expect(myServicioSpy.addRecipe).toHaveBeenCalledWith(mockUser.id, {
      name: 'Test Recipe',
      ingredients: ['Ingredient 1', 'Ingredient 2']
    });
    expect(component.recipeName).toBe('');
    expect(component.ingredients).toEqual(new Array(15).fill(''));
    expect(navCtrlSpy.navigateRoot).toHaveBeenCalledWith('/tabs/mis-recetas');
  });
});