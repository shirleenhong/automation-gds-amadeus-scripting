import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendInvoiceComponent } from './resend-invoice.component';

describe('ResendInvoiceComponent', () => {
  let component: ResendInvoiceComponent;
  let fixture: ComponentFixture<ResendInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResendInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResendInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
