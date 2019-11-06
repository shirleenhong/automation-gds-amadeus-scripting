import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonBspTicketCreditComponent } from './non-bsp-ticket-credit.component';

describe('NonBspTicketComponent', () => {
  let component: NonBspTicketCreditComponent;
  let fixture: ComponentFixture<NonBspTicketCreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NonBspTicketCreditComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonBspTicketCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
