import { TestBed } from '@angular/core/testing';

import { ApprovalRuleService } from './approval-rule.service';

describe('ApprovalRuleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApprovalRuleService = TestBed.get(ApprovalRuleService);
    expect(service).toBeTruthy();
  });
});
