import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { PnrService } from '../../../service/pnr.service';


@Component({
  selector: 'app-hotel-segments',
  templateUrl: './hotel-segments.component.html',
  styleUrls: ['./hotel-segments.component.scss']
})
export class HotelSegmentsComponent implements OnInit {
    hotelSegments: FormGroup;
  constructor(private fb: FormBuilder,
    private pnrService: PnrService) {
  }

    ngOnInit() {
        this.hotelSegments = this.fb.group({
            hotels: this.fb.array([this.createFormGroup('', '', '', '')])
          });
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
            chkIncluded: new FormControl(''),
           });
        return group;
    }
}
