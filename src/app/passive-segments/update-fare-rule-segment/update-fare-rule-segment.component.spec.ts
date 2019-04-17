import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFareRuleSegmentComponent } from './update-fare-rule-segment.component';

describe('UpdateFareRuleSegmentComponent', () => {
  let component: UpdateFareRuleSegmentComponent;
  let fixture: ComponentFixture<UpdateFareRuleSegmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateFareRuleSegmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFareRuleSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
