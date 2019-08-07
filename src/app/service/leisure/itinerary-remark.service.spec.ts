import { TestBed } from '@angular/core/testing';

import { ItineraryRemarkService } from './itinerary-remark.service';

describe('ItineraryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItineraryRemarkService = TestBed.get(ItineraryRemarkService);
    expect(service).toBeTruthy();
  });
});
