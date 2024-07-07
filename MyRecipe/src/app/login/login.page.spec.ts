import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MyServicioService } from '../myservicio.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let myServicioSpy: jasmine.SpyObj<MyServicioService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(waitForAsync(() => {
    const spyMyServicio = jasmine.createSpyObj('MyServicioService', ['getUser', 'setLoggedInUser']);
    const spyRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: MyServicioService, useValue: spyMyServicio },
        { provide: Router, useValue: spyRouter }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    myServicioSpy = TestBed.inject(MyServicioService) as jasmine.SpyObj<MyServicioService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize loginForm', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.controls['username']).toBeDefined();
    expect(component.loginForm.controls['password']).toBeDefined();
  });

  it('should be invalid when form is empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should be valid when form is filled correctly', () => {
    component.loginForm.controls['username'].setValue('test20');
    component.loginForm.controls['password'].setValue('9876');
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should call getUser and setLoggedInUser on successful login', async () => {
    component.loginForm.controls['username'].setValue('test20');
    component.loginForm.controls['password'].setValue('9876');

    const mockUser = { id: 1, username: 'test20', firstName: 'Test', lastName: 'User', birthDate: '1990-01-01', password: '9876' };
    myServicioSpy.getUser.and.returnValue(Promise.resolve(mockUser));
    myServicioSpy.setLoggedInUser.and.returnValue(Promise.resolve());

    await component.onSubmit();

    expect(myServicioSpy.getUser).toHaveBeenCalledWith('test20', '9876');
    expect(myServicioSpy.setLoggedInUser).toHaveBeenCalledWith('test20', '9876');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/tabs/mis-recetas']);
  });

  it('should log error message on failed login', async () => {
    spyOn(console, 'log');
    component.loginForm.controls['username'].setValue('wrong');
    component.loginForm.controls['password'].setValue('6666');

    myServicioSpy.getUser.and.returnValue(Promise.resolve(null));

    await component.onSubmit();

    expect(myServicioSpy.getUser).toHaveBeenCalledWith('wrong', '6666');
    expect(console.log).toHaveBeenCalledWith('Usuario o contraseña incorrectos');
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});