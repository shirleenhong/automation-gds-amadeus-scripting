import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineCorporatePassRedemptionComponent } from './airline-corporate-pass-redemption.component';

describe('AirlineCorporatePassRedemptionComponent', () => {
  let component: AirlineCorporatePassRedemptionComponent;
  let fixture: ComponentFixture<AirlineCorporatePassRedemptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineCorporatePassRedemptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineCorporatePassRedemptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
