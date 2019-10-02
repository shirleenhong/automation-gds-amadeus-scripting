import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AquaTicketingComponent } from './aqua-ticketing.component';

describe('AquaTicketingComponent', () => {
  let component: AquaTicketingComponent;
  let fixture: ComponentFixture<AquaTicketingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AquaTicketingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AquaTicketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
