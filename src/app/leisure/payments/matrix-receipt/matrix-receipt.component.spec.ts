import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixReceiptComponent } from './matrix-receipt.component';

describe('MatrixReceiptComponent', () => {
  let component: MatrixReceiptComponent;
  let fixture: ComponentFixture<MatrixReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrixReceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
