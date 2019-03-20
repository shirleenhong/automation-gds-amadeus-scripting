import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassiveSegmentsComponent } from './passive-segments.component';

describe('PassiveSegmentsComponent', () => {
  let component: PassiveSegmentsComponent;
  let fixture: ComponentFixture<PassiveSegmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassiveSegmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassiveSegmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
