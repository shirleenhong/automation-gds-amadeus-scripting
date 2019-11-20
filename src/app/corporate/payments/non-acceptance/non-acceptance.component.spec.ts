import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonAcceptanceComponent } from './non-acceptance.component';

describe('NonAcceptanceComponent', () => {
  let component: NonAcceptanceComponent;
  let fixture: ComponentFixture<NonAcceptanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonAcceptanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonAcceptanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
