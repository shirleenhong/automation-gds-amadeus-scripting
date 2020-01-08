import { TestBed } from '@angular/core/testing';

import { CommonRemarkService } from './common-remark.service';

describe('CommonRemarkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonRemarkService = TestBed.get(CommonRemarkService);
    expect(service).toBeTruthy();
  });
});
