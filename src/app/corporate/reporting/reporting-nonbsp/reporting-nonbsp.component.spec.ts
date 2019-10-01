import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingNonbspComponent } from './reporting-nonbsp.component';

describe('ReportingNonbspComponent', () => {
  let component: ReportingNonbspComponent;
  let fixture: ComponentFixture<ReportingNonbspComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportingNonbspComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportingNonbspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
