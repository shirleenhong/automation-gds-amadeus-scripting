import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelSegmentComponent } from './cancel-segment.component';

describe('CancelSegmentComponent', () => {
  let component: CancelSegmentComponent;
  let fixture: ComponentFixture<CancelSegmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelSegmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
