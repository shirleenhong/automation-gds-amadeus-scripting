import { TestBed } from '@angular/core/testing';

import { CorpRemarksService } from './corp-remarks.service';

describe('CorpRemarksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CorpRemarksService = TestBed.get(CorpRemarksService);
    expect(service).toBeTruthy();
  });
});
