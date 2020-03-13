import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePnrComponent } from './change-pnr.component';

describe('ChangePnrComponent', () => {
  let component: ChangePnrComponent;
  let fixture: ComponentFixture<ChangePnrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePnrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePnrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
