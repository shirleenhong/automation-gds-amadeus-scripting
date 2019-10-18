import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfcDocumentationComponent } from './ofc-documentation.component';

describe('OfcDocumentationComponent', () => {
  let component: OfcDocumentationComponent;
  let fixture: ComponentFixture<OfcDocumentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfcDocumentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfcDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
