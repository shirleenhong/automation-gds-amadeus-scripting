import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IrdInvoiceRequestComponent } from './ird-invoice-request.component';

describe('IrdRateRequestComponent', () => {
  let component: IrdInvoiceRequestComponent;
  let fixture: ComponentFixture<IrdInvoiceRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IrdInvoiceRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IrdInvoiceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
