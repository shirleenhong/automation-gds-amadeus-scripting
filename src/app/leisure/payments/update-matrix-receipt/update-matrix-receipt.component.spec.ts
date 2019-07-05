import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMatrixReceiptComponent } from './update-matrix-receipt.component';

describe('UpdateMatrixReceiptComponent', () => {
  let component: UpdateMatrixReceiptComponent;
  let fixture: ComponentFixture<UpdateMatrixReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMatrixReceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMatrixReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
