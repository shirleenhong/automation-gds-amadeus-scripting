import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignInvoiceToOidComponent } from './assign-invoice-to-oid.component';

describe('AssignInvoiceToOidComponent', () => {
  let component: AssignInvoiceToOidComponent;
  let fixture: ComponentFixture<AssignInvoiceToOidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignInvoiceToOidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignInvoiceToOidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
