import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpCancelComponent } from './corp-cancel.component';

describe('CorpCancelComponent', () => {
  let component: CorpCancelComponent;
  let fixture: ComponentFixture<CorpCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorpCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
