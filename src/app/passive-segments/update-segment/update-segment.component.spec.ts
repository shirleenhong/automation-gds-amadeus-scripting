import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSegmentComponent } from './update-segment.component';

describe('UpdateSegmentComponent', () => {
  let component: UpdateSegmentComponent;
  let fixture: ComponentFixture<UpdateSegmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSegmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
