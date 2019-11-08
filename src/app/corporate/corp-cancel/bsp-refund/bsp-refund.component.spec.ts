import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BspRefundComponent } from './bsp-refund.component';

describe('NonBspTicketComponent', () => {
  let component: BspRefundComponent;
  let fixture: ComponentFixture<BspRefundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BspRefundComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BspRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
