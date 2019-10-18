import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentPnrComponent } from './document-pnr.component';

describe('DocumentPnrComponent', () => {
  let component: DocumentPnrComponent;
  let fixture: ComponentFixture<DocumentPnrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentPnrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentPnrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
