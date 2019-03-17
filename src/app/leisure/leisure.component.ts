import { Component, OnInit } from '@angular/core';
import {PnrService} from '../service/pnr.service'
import { RemarkService } from '../service/remark.service';
import { RemarkCollectionService } from '../service/remark.collection.service';

@Component({
  selector: 'app-leisure',
  templateUrl: './leisure.component.html',
  styleUrls: ['./leisure.component.scss']
})

export class LeisureComponent implements OnInit {
isPnrLoaded:boolean;
message:string;
  constructor(private pnrService: PnrService,private remarkService:RemarkService,private remarkCollectionService : RemarkCollectionService) { }

  ngOnInit() {
    this.pnrService.getPNR();  
   
  }
  
  public checkPNR(){
    this.isPnrLoaded = this.pnrService.isPNRLoaded;
    this.message = this.pnrService.getCFLine();
  }

  public SubmitToPNR(){
    this.message = JSON.stringify(this.pnrService.pnrObj);
    this.remarkService.BuildRemarks(this.remarkCollectionService.remarkCollection)
    this.remarkService.SubmitRemarks().then(x=>{

             });
  }
}
