import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IrdRemarksComponent } from './ird-remarks.component';

describe('IrdRemarksComponent', () => {
  let component: IrdRemarksComponent;
  let fixture: ComponentFixture<IrdRemarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IrdRemarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IrdRemarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
