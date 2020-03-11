import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEmdComponent } from './update-emd.component';

describe('UpdateEmdComponent', () => {
  let component: UpdateEmdComponent;
  let fixture: ComponentFixture<UpdateEmdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateEmdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEmdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
