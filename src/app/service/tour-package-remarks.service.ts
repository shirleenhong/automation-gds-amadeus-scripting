
import { RemarkModel } from '../models/pnr/remark.model';

import { PnrService } from './pnr.service';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

declare var smartScriptSession: any;


@Injectable()
export class TourPackageRemarksService {

    constructor(private pnrService: PnrService) { }

    public GetRemarks(group: FormGroup) {

        // TODO: Do what ever here
        var model = new RemarkModel();
        model.remarkType = "Test"
        model.remarkText = group.controls['adultNum'].value;
        return
    }
}