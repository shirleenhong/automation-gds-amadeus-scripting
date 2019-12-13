import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeEndorsementsComponent } from './exchange-endorsements.component';

describe('AirFareCommissionComponent', () => {
  let component: ExchangeEndorsementsComponent;
  let fixture: ComponentFixture<ExchangeEndorsementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeEndorsementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeEndorsementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
