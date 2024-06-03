import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MisRecetasPage } from './mis-recetas.page';

describe('MisRecetasPage', () => {
  let component: MisRecetasPage;
  let fixture: ComponentFixture<MisRecetasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MisRecetasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
