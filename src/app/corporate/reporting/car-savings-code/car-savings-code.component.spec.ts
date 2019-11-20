import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarSavingsCodeComponent } from './car-savings-code.component';

describe('CarSavingsCodeComponent', () => {
  let component: CarSavingsCodeComponent;
  let fixture: ComponentFixture<CarSavingsCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarSavingsCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarSavingsCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
