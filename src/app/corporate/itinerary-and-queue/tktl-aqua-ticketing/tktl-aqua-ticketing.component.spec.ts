import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TktlAquaTicketingComponent } from './tktl-aqua-ticketing.component';

describe('TktlAquaTicketingComponent', () => {
  let component: TktlAquaTicketingComponent;
  let fixture: ComponentFixture<TktlAquaTicketingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TktlAquaTicketingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TktlAquaTicketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
