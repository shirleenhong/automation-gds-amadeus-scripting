import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpRemarksComponent } from './corp-remarks.component';

describe('CorpRemarksComponent', () => {
  let component: CorpRemarksComponent;
  let fixture: ComponentFixture<CorpRemarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorpRemarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpRemarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
