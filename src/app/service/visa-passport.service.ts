import { Injectable } from '@angular/core';
import { VisaPassportModel } from '../models/visa-passport-view.model';
import { PnrService } from './pnr.service';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
  })

  export class VisaPassportService {
    constructor(private pnrService: PnrService) { }

  getRemarks(form : FormGroup) {
     debugger;

     const formvisa = form;
    
  }
}
