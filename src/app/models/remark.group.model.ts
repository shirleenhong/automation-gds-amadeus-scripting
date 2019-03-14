import {RemarkModel} from  '../models/remark.model'
import { OnInit } from '@angular/core';
import { PassiveSegmentModel } from './passive-segment.model';

export class RemarkGroup implements OnInit{
  
   group : string;
   remarks: Array<RemarkModel>;
   
   ngOnInit(): void {
      this.remarks = new Array<RemarkModel>();
     
   }

}

export class PassiveSegmentGroup implements OnInit{
  
   group : string;
   passiveSegment: Array<PassiveSegmentModel>

   ngOnInit(): void {
      this.passiveSegment = new Array<PassiveSegmentModel>();
   }

}