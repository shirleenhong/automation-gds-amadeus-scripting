import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingRemarksComponent } from './reporting-remarks.component';

describe('ReportingRemarksComponent', () => {
  let component: ReportingRemarksComponent;
  let fixture: ComponentFixture<ReportingRemarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportingRemarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportingRemarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
