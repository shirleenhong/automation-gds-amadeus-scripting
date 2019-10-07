import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import  { ItineraryInvoiceQueue } from './itinerary-invoice-queue.component';


describe('QueueComponent', () => {
  let component: ItineraryInvoiceQueue;
  let fixture: ComponentFixture<ItineraryInvoiceQueue>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItineraryInvoiceQueue ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItineraryInvoiceQueue);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
