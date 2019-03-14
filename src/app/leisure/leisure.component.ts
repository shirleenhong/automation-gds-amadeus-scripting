import { Component, OnInit } from '@angular/core';
import {PnrService} from '../service/pnr.service'
import { RemarkService } from '../service/remark.service';
import { RemarkCollectionService } from '../service/remark.collection.service';


@Component({
  selector: 'app-leisure',
  templateUrl: './leisure.component.html',
  styleUrls: ['./leisure.component.css']
})

export class LeisureComponent implements OnInit {
isPnrLoaded:boolean;
message:string;
  constructor(private pnrService: PnrService,private remarkService:RemarkService,private remarkCollectionService : RemarkCollectionService, private passiveSegementCollection: RemarkCollectionService) { }

  ngOnInit() {
    this.pnrService.getPNR();  
  }
  
  public checkPNR(){
    this.isPnrLoaded = this.pnrService.isPNRLoaded;
    this.message = this.pnrService.getCFLine();
  }

  public SubmitToPNR(){
    this.remarkService.BuildRemarks(this.remarkCollectionService.remarkCollection, this.passiveSegementCollection.passiveSegmentCollection)
    this.remarkService.SubmitRemarks().then(x=>{      
   this.message=this.remarkService.responseMessage});
  }

}
