import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IrdRateRequestComponent } from './ird-rate-request.component';

describe('IrdRateRequestComponent', () => {
  let component: IrdRateRequestComponent;
  let fixture: ComponentFixture<IrdRateRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IrdRateRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IrdRateRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
