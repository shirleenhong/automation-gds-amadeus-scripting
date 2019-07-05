import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLeisureFeeComponent } from './update-leisure-fee.component';

describe('UpdateLeisureFeeComponent', () => {
  let component: UpdateLeisureFeeComponent;
  let fixture: ComponentFixture<UpdateLeisureFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateLeisureFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLeisureFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
