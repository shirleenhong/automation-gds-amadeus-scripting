import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendInvoiceItineraryComponent } from './send-invoice-itinerary.component';

describe('SendInvoiceItineraryComponent', () => {
  let component: SendInvoiceItineraryComponent;
  let fixture: ComponentFixture<SendInvoiceItineraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendInvoiceItineraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendInvoiceItineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
