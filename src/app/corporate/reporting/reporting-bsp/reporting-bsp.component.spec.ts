import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingBSPComponent } from './reporting-bsp.component';

describe('ReportingBSPComponent', () => {
  let component: ReportingBSPComponent;
  let fixture: ComponentFixture<ReportingBSPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportingBSPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportingBSPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
