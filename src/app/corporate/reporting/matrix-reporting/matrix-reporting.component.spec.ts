import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixReportingComponent } from './matrix-reporting.component';

describe('MatrixReportingComponent', () => {
  let component: MatrixReportingComponent;
  let fixture: ComponentFixture<MatrixReportingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrixReportingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
