import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoBookedHotelComponent } from './no-booked-hotel.component';

describe('NoBookedHotelComponent', () => {
  let component: NoBookedHotelComponent;
  let fixture: ComponentFixture<NoBookedHotelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoBookedHotelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoBookedHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
