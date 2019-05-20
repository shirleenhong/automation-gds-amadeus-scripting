import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRbcPointsRedemptionComponent } from './update-rbc-points-redemption.component';

describe('UpdateRbcPointsRedemptionComponent', () => {
  let component: UpdateRbcPointsRedemptionComponent;
  let fixture: ComponentFixture<UpdateRbcPointsRedemptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateRbcPointsRedemptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRbcPointsRedemptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
