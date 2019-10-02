import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWaiverComponent } from './add-waiver.component';

describe('AddWaiverComponent', () => {
  let component: AddWaiverComponent;
  let fixture: ComponentFixture<AddWaiverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWaiverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWaiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
