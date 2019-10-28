import { TestBed } from '@angular/core/testing';

import { AirlineCorporatePassService } from './airline-corporate-pass.service';

describe('AirlineCorporatePassService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AirlineCorporatePassService = TestBed.get(AirlineCorporatePassService);
    expect(service).toBeTruthy();
  });
});
