import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItcPackageComponent } from './itc-package.component';

describe('ItcPackageComponent', () => {
  let component: ItcPackageComponent;
  let fixture: ComponentFixture<ItcPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItcPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItcPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
