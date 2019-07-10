import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RbcPointsRedemptionComponent } from './rbc-points-redemption.component';

describe('RbcPointsRedemptionComponent', () => {
  let component: RbcPointsRedemptionComponent;
  let fixture: ComponentFixture<RbcPointsRedemptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RbcPointsRedemptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RbcPointsRedemptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
