import { TourSegmentViewModel } from './tour-segment-view.model';
import { PassiveSegmentModel } from './pnr/passive-segment.model';
import { Input } from '@angular/core';

export class PassiveSegmentViewModel {
   tourSegmentView: TourSegmentViewModel;
   constructor() {
      this.tourSegmentView = new TourSegmentViewModel();

   }

}
