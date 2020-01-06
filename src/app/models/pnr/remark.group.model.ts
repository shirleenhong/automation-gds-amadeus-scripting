import { RemarkModel } from './remark.model';
import { PassiveSegmentModel } from './passive-segment.model';
import { QueuePlaceModel } from './queue-place.model';

export class RemarkGroup {
  group: string;
  remarks: Array<RemarkModel>;
  cryptics: Array<string>;
  updateCommands: Array<string>;
  deleteRemarkByIds: Array<string>;
  deleteSegmentByIds: Array<string>;
  passiveSegments: Array<PassiveSegmentModel>;
  queuePlace: Array<QueuePlaceModel>;

  constructor() {
    this.remarks = new Array<RemarkModel>();
    this.cryptics = new Array<string>();
    this.updateCommands = new Array<string>();
    this.deleteRemarkByIds = new Array<string>();
    this.deleteSegmentByIds = new Array<string>();
  }
}
