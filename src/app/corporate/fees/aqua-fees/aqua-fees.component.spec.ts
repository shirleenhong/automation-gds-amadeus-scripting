import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AquaFeesComponent } from './aqua-fees.component';

describe('AquaFeesComponent', () => {
  let component: AquaFeesComponent;
  let fixture: ComponentFixture<AquaFeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AquaFeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AquaFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
