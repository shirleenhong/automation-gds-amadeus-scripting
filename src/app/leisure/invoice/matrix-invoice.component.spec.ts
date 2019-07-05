import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixInvoiceComponent } from './matrix-invoice.component';

describe('MatrixInvoiceComponent', () => {
  let component: MatrixInvoiceComponent;
  let fixture: ComponentFixture<MatrixInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrixInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});