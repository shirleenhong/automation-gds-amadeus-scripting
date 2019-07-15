import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentSelectComponent } from './segment-select.component';

describe('SegmentSelectComponent', () => {
  let component: SegmentSelectComponent;
  let fixture: ComponentFixture<SegmentSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegmentSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
