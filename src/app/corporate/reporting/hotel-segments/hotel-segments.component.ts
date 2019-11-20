import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { PnrService } from '../../../service/pnr.service';
import { DatePipe } from '@angular/common';
import {DDBService} from '../../../service/ddb.service'


@Component({
  selector: 'app-hotel-segments',
  templateUrl: './hotel-segments.component.html',
  styleUrls: ['./hotel-segments.component.scss']
})
export class HotelSegmentsComponent implements OnInit {
    hotelSegments: FormGroup;
    hotels: FormArray;
    segmentList: any[];
    hotelSegmentList: any[];
    datePipe: any;
   
  constructor(private fb: FormBuilder,
      private pnrService: PnrService){
        //private ddbService : DDBService) {
        this.datePipe = new DatePipe('en-US');
  }

    ngOnInit() {
        // this.hotelSegments = this.fb.group({
        //     hotels: this.fb.array([this.createFormGroup('', '', '', '')])
        // });
        
       // let savingsCodeList = this.ddbService.getReasonCodeByTypeId([1], '', 1);
        this.segmentList = this.pnrService.getSegmentList(); 
        this.hotelSegmentList = this.segmentList.filter((x) => { if(x.segmentType === 'HTL'){return x} });
        this.hotelSegmentList = this.getHotelPreFilledValues(this.hotelSegmentList);
        console.log(this.segmentList);
     if (this.hotelSegmentList.length > 0) {
         // this.hotelSegmentList.push(this.createItem());
          this.hotelSegments = new FormGroup({
            hotels: this.fb.array(this.hotelSegmentList)
          });
          this.hotels = this.hotelSegments.get('hotels') as FormArray;
        }

    } 


    getHotelPreFilledValues(data) {
        
        const groupArray = [];
       
        for (const sr of data) {
            let date = new Date(sr)
            let month = this.datePipe.transform(sr.deptdate, 'MM');
          let chainCode = "";
          
          const group = this.fb.group({
            checkInDate: new FormControl(date),
            checkInMonth: new FormControl(month),
            hotelSavingsCode: new FormControl(''),
            chainCode: new FormControl(chainCode),
            chkIncluded: new FormControl(false),
          });
          
            groupArray.push(group);
        }
        return groupArray;
      }
  
    createFormGroup(
        checkInDate: string,
        checkInMonth: string,
        hotelSavingsCode: string,
        chainCode: string,
        // defaultValue?: any
    ): FormGroup {
        const group = this.fb.group({
            checkInDate: new FormControl(checkInDate),
            checkInMonth: new FormControl(checkInMonth),
            hotelSavingsCode: new FormControl(hotelSavingsCode),
            chainCode: new FormControl(chainCode),
            chkIncluded: new FormControl(false),
           });
        return group;
    }
}
