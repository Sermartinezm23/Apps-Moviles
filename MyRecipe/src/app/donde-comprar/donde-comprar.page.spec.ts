import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DondeComprarPage } from './donde-comprar.page';
import { Geolocation } from '@capacitor/geolocation';
import * as L from 'leaflet';

describe('DondeComprarPage', () => {
  let component: DondeComprarPage;
  let fixture: ComponentFixture<DondeComprarPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DondeComprarPage],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DondeComprarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get current position and load map', async () => {
    const mockCoordinates: GeolocationPosition = {
      coords: {
        latitude: 51.505,
        longitude: -0.09,
        accuracy: 0,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
      },
      timestamp: Date.now()
    };
    spyOn(Geolocation, 'getCurrentPosition').and.returnValue(Promise.resolve(mockCoordinates));

    const mapMock: jasmine.SpyObj<L.Map> = jasmine.createSpyObj('Map', ['setView']);
    const tileLayerMock: jasmine.SpyObj<L.TileLayer> = jasmine.createSpyObj('TileLayer', ['addTo']);
    const markerMock: jasmine.SpyObj<L.Marker> = jasmine.createSpyObj('Marker', ['addTo', 'bindPopup', 'openPopup']);

    spyOn(L, 'map').and.returnValue(mapMock);
    spyOn(L, 'tileLayer').and.returnValue(tileLayerMock);
    spyOn(L, 'marker').and.returnValue(markerMock);

    await component.ngOnInit();

    expect(component.latitude).toBe(51.505);
    expect(component.longitude).toBe(-0.09);

    expect(L.map).toHaveBeenCalledWith('mapId');
    expect(mapMock.setView).toHaveBeenCalledWith([51.505, -0.09], 13);
    expect(L.tileLayer).toHaveBeenCalledWith('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    });
    expect(L.marker).toHaveBeenCalledWith([51.505, -0.09]);
    expect(markerMock.bindPopup).toHaveBeenCalledWith('Estás aquí');
    expect(markerMock.openPopup).toHaveBeenCalled();
  });

  it('should handle geolocation error', async () => {
    const mockError = new Error('Geolocation error');
    spyOn(Geolocation, 'getCurrentPosition').and.returnValue(Promise.reject(mockError));
    spyOn(console, 'error');

    await component.ngOnInit();

    expect(console.error).toHaveBeenCalledWith('Error getting location', mockError);
    expect(component.latitude).toBe(0);
    expect(component.longitude).toBe(0);
  });
});