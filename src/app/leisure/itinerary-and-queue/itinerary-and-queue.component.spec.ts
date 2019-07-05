import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItineraryAndQueueComponent } from './itinerary-and-queue.component';

describe('ItineraryAndQueueComponent', () => {
  let component: ItineraryAndQueueComponent;
  let fixture: ComponentFixture<ItineraryAndQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItineraryAndQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItineraryAndQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
