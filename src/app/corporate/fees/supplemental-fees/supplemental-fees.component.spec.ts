import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplementalFeesComponent } from './supplemental-fees.component';

describe('SupplementalFeesComponent', () => {
  let component: SupplementalFeesComponent;
  let fixture: ComponentFixture<SupplementalFeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SupplementalFeesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplementalFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
