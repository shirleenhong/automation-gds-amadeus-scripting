import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BspTicketFopComponent } from './bsp-ticket-fop.component';

describe('BspTicketFopComponent', () => {
  let component: BspTicketFopComponent;
  let fixture: ComponentFixture<BspTicketFopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BspTicketFopComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BspTicketFopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
