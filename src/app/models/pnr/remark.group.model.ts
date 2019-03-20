import { RemarkModel } from './remark.model'
import { PassiveSegmentModel } from './passive-segment.model';



export class RemarkGroup {

   group: string;
   remarks: Array<RemarkModel>;
   cryptics: Array<string>;
   deleteRemarkByIds: Array<string>;
   passiveSegments: Array<PassiveSegmentModel>

   constructor() {
      this.remarks = new Array<RemarkModel>();
      this.cryptics = new Array<string>();
      this.deleteRemarkByIds = new Array<string>();
   }
}