import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FareRuleSegmentComponent } from './fare-rule-segment.component';

describe('FareRuleSegmentComponent', () => {
  let component: FareRuleSegmentComponent;
  let fixture: ComponentFixture<FareRuleSegmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FareRuleSegmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FareRuleSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
