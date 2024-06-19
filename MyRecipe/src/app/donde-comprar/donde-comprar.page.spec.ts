import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DondeComprarPage } from './donde-comprar.page';

describe('DondeComprarPage', () => {
  let component: DondeComprarPage;
  let fixture: ComponentFixture<DondeComprarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DondeComprarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
