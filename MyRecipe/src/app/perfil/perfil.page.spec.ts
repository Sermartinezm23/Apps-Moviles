import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PerfilPage } from './perfil.page';
import { MyServicioService, User } from '../myservicio.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('PerfilPage', () => {
  let component: PerfilPage;
  let fixture: ComponentFixture<PerfilPage>;
  let myServicioSpy: jasmine.SpyObj<MyServicioService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(waitForAsync(() => {
    const spyMyServicio = jasmine.createSpyObj('MyServicioService', ['getUserFromSession', 'updateUser', 'logout']);
    const spyRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [PerfilPage],
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
    fixture = TestBed.createComponent(PerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user on ngOnInit', async () => {
    const mockUser: User = {
      id: 1,
      firstName: 'Test',
      lastName: 'User',
      birthDate: '2000-01-01',
      username: 'test30',
      password: '1234'
    };

    myServicioSpy.getUserFromSession.and.returnValue(Promise.resolve(mockUser));

    await component.ngOnInit();

    expect(myServicioSpy.getUserFromSession).toHaveBeenCalled();
    expect(component.user).toEqual(mockUser);
  });

  it('should navigate to login if no user found', async () => {
    myServicioSpy.getUserFromSession.and.returnValue(Promise.resolve(null));

    await component.ngOnInit();

    expect(myServicioSpy.getUserFromSession).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should toggle edit mode', () => {
    component.isEditing = false;
    component.toggleEdit();
    expect(component.isEditing).toBeTrue();

    component.toggleEdit();
    expect(component.isEditing).toBeFalse();
  });

  it('should save changes and toggle edit mode', async () => {
    const mockUser: User = {
      id: 1,
      firstName: 'Test',
      lastName: 'User',
      birthDate: '2000-01-01',
      username: 'test30',
      password: '1234'
    };
    component.user = mockUser;

    await component.saveChanges();

    expect(myServicioSpy.updateUser).toHaveBeenCalledWith(mockUser);
    expect(component.isEditing).toBeFalse();
  });

  it('should logout and navigate to login', async () => {
    await component.logout();

    expect(myServicioSpy.logout).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});