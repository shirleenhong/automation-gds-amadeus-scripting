import { TestBed } from '@angular/core/testing';

import { PaymentRemarkService } from './payment-remark.service';

describe('PaymentRemarkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaymentRemarkService = TestBed.get(PaymentRemarkService);
    expect(service).toBeTruthy();
  });
});
