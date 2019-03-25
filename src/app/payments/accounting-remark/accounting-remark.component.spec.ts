import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingRemarkComponent } from './accounting-remark.component';

describe('AccountingRemarkComponent', () => {
  let component: AccountingRemarkComponent;
  let fixture: ComponentFixture<AccountingRemarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountingRemarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingRemarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
