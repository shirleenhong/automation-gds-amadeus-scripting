import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourSegmentComponent } from './tour-segment.component';

describe('TourSegmentComponent', () => {
  let component: TourSegmentComponent;
  let fixture: ComponentFixture<TourSegmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourSegmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
