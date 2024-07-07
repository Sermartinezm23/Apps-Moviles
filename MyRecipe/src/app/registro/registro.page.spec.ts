import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RegistroPage } from './registro.page';
import { MyServicioService } from '../myservicio.service';

describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;
  let myServicioSpy: jasmine.SpyObj<MyServicioService>;

  beforeEach(waitForAsync(() => {
    const spyMyServicio = jasmine.createSpyObj('MyServicioService', ['addUser']);

    TestBed.configureTestingModule({
      declarations: [RegistroPage],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: MyServicioService, useValue: spyMyServicio }
      ]
    }).compileComponents();

    myServicioSpy = TestBed.inject(MyServicioService) as jasmine.SpyObj<MyServicioService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the registerForm', () => {
    expect(component.registerForm).toBeDefined();
  });

  it('should invalidate the form if passwords do not match', () => {
    component.registerForm.setValue({
      firstName: 'Hugo',
      lastName: 'Alvarez',
      birthDate: '2000-01-01',
      username: 'Hugo123',
      password: '1234',
      confirmPassword: '4321'
    });
    expect(component.registerForm.invalid).toBeTrue();
    expect(component.registerForm.get('confirmPassword')?.hasError('mismatch')).toBeTrue();
  });

  it('should validate the form if passwords match', () => {
    component.registerForm.setValue({
      firstName: 'Hugo',
      lastName: 'Alvarez',
      birthDate: '2000-01-01',
      username: 'Hugo123',
      password: '1234',
      confirmPassword: '1234'
    });
    expect(component.registerForm.valid).toBeTrue();
  });

  it('should call addUser and navigate to /login on successful submit', async () => {
    component.registerForm.setValue({
      firstName: 'Hugo',
      lastName: 'Alvarez',
      birthDate: '2000-01-01',
      username: 'Hugo123',
      password: '1234',
      confirmPassword: '1234'
    });

    myServicioSpy.addUser.and.returnValue(Promise.resolve());

    const navigateSpy = spyOn(component['router'], 'navigate');

    await component.onSubmit();

    expect(myServicioSpy.addUser).toHaveBeenCalledWith({
      firstName: 'Hugo',
      lastName: 'Alvarez',
      birthDate: '2000-01-01',
      username: 'Hugo123',
      password: '1234'
    });
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});