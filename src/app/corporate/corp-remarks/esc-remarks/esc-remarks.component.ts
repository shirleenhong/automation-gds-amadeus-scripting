import { Component, OnInit } from '@angular/core';
import { CounselorDetail } from '../../../globals/counselor-identity';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-esc-remarks',
    templateUrl: './esc-remarks.component.html',
    styleUrls: ['./esc-remarks.component.scss']
})
export class EscRemarksComponent implements OnInit {
    isEsc: boolean; 
    escRemarksForm: FormGroup;
    constructor(private counselorDetail : CounselorDetail,private fb: FormBuilder) {}

    ngOnInit() {
        this.counselorDetail.identityOnChange.subscribe((x) => {
          this.isEsc = x === 'ESC';
        });

        this.escRemarksForm = this.fb.group({
            isESCRead: new FormControl('', [Validators.required])
          });
    }
    
    
}
    