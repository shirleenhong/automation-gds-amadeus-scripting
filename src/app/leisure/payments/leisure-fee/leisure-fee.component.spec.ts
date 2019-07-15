import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeisureFeeComponent } from './leisure-fee.component';

describe('LeisureFeeComponent', () => {
  let component: LeisureFeeComponent;
  let fixture: ComponentFixture<LeisureFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeisureFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeisureFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
