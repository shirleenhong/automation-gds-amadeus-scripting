import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirFareCommissionComponent } from './air-fare-commission.component';

describe('AirFareCommissionComponent', () => {
  let component: AirFareCommissionComponent;
  let fixture: ComponentFixture<AirFareCommissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirFareCommissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirFareCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
