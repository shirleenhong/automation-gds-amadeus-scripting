import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAccountingRemarkComponent } from './update-accounting-remark.component';

describe('UpdateAccountingRemarkComponent', () => {
  let component: UpdateAccountingRemarkComponent;
  let fixture: ComponentFixture<UpdateAccountingRemarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAccountingRemarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAccountingRemarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
