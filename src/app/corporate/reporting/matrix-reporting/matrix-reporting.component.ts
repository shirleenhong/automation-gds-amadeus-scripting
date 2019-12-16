import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatrixReportingModel } from 'src/app/models/pnr/matirx-reporting.model';
import { PnrService } from 'src/app/service/pnr.service';
import { CounselorDetail } from 'src/app/globals/counselor-identity';

@Component({
  selector: 'app-matrix-reporting',
  templateUrl: './matrix-reporting.component.html',
  styleUrls: ['./matrix-reporting.component.scss']
})
export class MatrixReportingComponent implements OnInit {
  @Input()
  matrixReporting: MatrixReportingModel;
  invoiceMessageForm: FormGroup;
  isOFC = false;
  isMatrixPnr = true;
  constructor(private pnrService: PnrService, private counselorDetail: CounselorDetail) {
    this.matrixReporting = new MatrixReportingModel();
    this.matrixReporting.mode = 'YES';
  }

  ngOnInit() {
    this.invoiceMessageForm = new FormGroup({
      rbFileFinisher: new FormControl(''),
      cicNumber: new FormControl('')
    });
    this.isMatrixPnr = this.IsSegmentExchange() || this.IsContainsThisRemark('CN/-IFC') || this.IsContainsFIRemark('PAX 0000000000 INV');
    this.subscribeOnOfcEscDropdown();
  }
  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterViewInit() {
    if (this.isMatrixPnr) {
      this.setCICNumber();
    }
  }

  subscribeOnOfcEscDropdown() {
    this.counselorDetail.identityOnChange.subscribe((value) => {
      if (value === 'OFC') {
        this.isOFC = true;
      } else {
        this.isOFC = false;
        this.matrixReporting.mode = 'YES';
        if (this.invoiceMessageForm !== undefined) {
          this.invoiceMessageForm.get('cicNumber').setValue('');
          this.invoiceMessageForm.get('cicNumber').enable();
        }
      }
    });
  }

  setADTValue() {
    if (this.matrixReporting.mode === 'NO') {
      this.invoiceMessageForm.get('cicNumber').setValue('ADT');
      this.invoiceMessageForm.get('cicNumber').disable();
    } else {
      this.invoiceMessageForm.get('cicNumber').setValue('');
      this.invoiceMessageForm.get('cicNumber').enable();
    }
  }

  setCICNumber() {
    const remark = this.pnrService.getRemarkText('CN/-');
    const regex = /(?<=CN\/-).*$/g;

    const match = regex.exec(remark);
    if (match !== null) {
      this.invoiceMessageForm.get('cicNumber').setValue(match[0]);
    }
  }

  IsSegmentExchange(): boolean {
    return this.pnrService.exchangeTatooNumbers.length > 0 || this.IsContainsThisRemark('NE/-EX-Y');
  }

  IsContainsThisRemark(value: string) {
    const remark = this.pnrService.getRemarkText(value);
    return remark.length > 0;
  }

  IsContainsFIRemark(value: string) {
    const remark = this.pnrService.getFIElementText(value);
    return remark.length > 0;
  }
}
