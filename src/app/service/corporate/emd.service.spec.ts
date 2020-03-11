import { TestBed } from '@angular/core/testing';

import { EmdService } from './emd.service';

describe('EmdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmdService = TestBed.get(EmdService);
    expect(service).toBeTruthy();
  });
});
