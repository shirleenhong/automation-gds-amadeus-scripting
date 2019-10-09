import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketingLineComponent } from './ticketing-line.component';

describe('TicketingLineComponent', () => {
  let component: TicketingLineComponent;
  let fixture: ComponentFixture<TicketingLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketingLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketingLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
