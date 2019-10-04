import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueMinderComponent } from './queue-minder.component';

describe('QueueMinderComponent', () => {
  let component: QueueMinderComponent;
  let fixture: ComponentFixture<QueueMinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueueMinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueueMinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
