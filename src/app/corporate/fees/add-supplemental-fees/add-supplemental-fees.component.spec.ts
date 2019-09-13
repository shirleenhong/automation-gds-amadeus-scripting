import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSupplementalFeesComponent } from './add-supplemental-fees.component';

describe('AddSupplementalFeesComponent', () => {
  let component: AddSupplementalFeesComponent;
  let fixture: ComponentFixture<AddSupplementalFeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSupplementalFeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSupplementalFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
