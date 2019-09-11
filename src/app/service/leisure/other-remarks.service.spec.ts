import { TestBed } from '@angular/core/testing';

import { OtherRemarksService } from './other-remarks.service';

describe('OtherRemarksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OtherRemarksService = TestBed.get(OtherRemarksService);
    expect(service).toBeTruthy();
  });
});
