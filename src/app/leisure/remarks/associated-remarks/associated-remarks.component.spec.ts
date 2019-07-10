import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatedRemarksComponent } from './associated-remarks.component';

describe('AssociatedRemarksComponent', () => {
  let component: AssociatedRemarksComponent;
  let fixture: ComponentFixture<AssociatedRemarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociatedRemarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociatedRemarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
