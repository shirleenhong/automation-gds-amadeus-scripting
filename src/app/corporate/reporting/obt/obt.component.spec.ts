import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObtComponent } from './obt.component';

describe('ObtComponent', () => {
  let component: ObtComponent;
  let fixture: ComponentFixture<ObtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
