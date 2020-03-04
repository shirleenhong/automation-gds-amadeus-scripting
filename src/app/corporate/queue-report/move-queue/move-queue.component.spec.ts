import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveQueueComponent } from './move-queue.component';

describe('MoveQueueComponent', () => {
  let component: MoveQueueComponent;
  let fixture: ComponentFixture<MoveQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
