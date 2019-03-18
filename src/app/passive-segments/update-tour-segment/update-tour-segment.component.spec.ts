import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTourSegmentComponent } from './update-tour-segment.component';

describe('UpdateTourSegmentComponent', () => {
  let component: UpdateTourSegmentComponent;
  let fixture: ComponentFixture<UpdateTourSegmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTourSegmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTourSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
