import { TestBed } from '@angular/core/testing';

import { CorporateRemarksService } from './corporate-remarks.service';

describe('CorporateRemarksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CorporateRemarksService = TestBed.get(CorporateRemarksService);
    expect(service).toBeTruthy();
  });
});
