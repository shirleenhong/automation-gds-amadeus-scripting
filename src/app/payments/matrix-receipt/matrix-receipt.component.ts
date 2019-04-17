import { Component, OnInit, Input } from '@angular/core';
import { MatrixReceiptModel } from '../../models/pnr/matrix-receipt.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UpdateMatrixReceiptComponent } from '../update-matrix-receipt/update-matrix-receipt.component';
import { PnrService } from 'src/app/service/pnr.service';
import { UtilHelper } from 'src/app/helper/util.helper';

@Component({
  selector: 'app-matrix-receipt',
  templateUrl: './matrix-receipt.component.html',
  styleUrls: ['./matrix-receipt.component.scss']
})
export class MatrixReceiptComponent implements OnInit {

  @Input()
  matrixReceipts: MatrixReceiptModel[] = [];
  modalRef: BsModalRef;
  isAddNew = false;
  constructor(private modalService: BsModalService, private pnrService: PnrService, private utilHelper: UtilHelper) { }

  ngOnInit() {
    this.loadMatrixReceipt();
    this.modalSubscribeOnClose();
  }

  loadMatrixReceipt() {
    this.matrixReceipts = this.pnrService.getMatrixReceiptRemarks();
  }

  modalSubscribeOnClose() {
    this.modalService.onHide.subscribe(result => {
      if (this.modalRef !== undefined && this.modalRef.content.isSubmitted) {
        if (!this.isAddNew) {
          const cur = this.matrixReceipts.find(x => x.rln === this.modalRef.content.matrixReceipt.rln);
          this.utilHelper.modelCopy(this.modalRef.content.matrixReceipt, cur);
        } else {
          this.matrixReceipts.push(this.modalRef.content.matrixReceipt);
        }
        this.modalRef.content.isSubmitted = false;
      }
    });
  }


  deleteItem(r: MatrixReceiptModel) {
    if (confirm('Are you sure you want to delete this Matrix Receipt?')) {
      this.matrixReceipts.splice(this.matrixReceipts.indexOf(r), 1);
      let i = 1;
      this.matrixReceipts.forEach(x => {
        x.rln = i;
        i++;
      });
    }
  }


  updateItem(r: MatrixReceiptModel) {
    this.isAddNew = false;
    this.modalRef = this.modalService.show(UpdateMatrixReceiptComponent, { backdrop: 'static' });
    this.modalRef.content.title = 'Update Matrix Receipt';
    this.modalRef.content.matrixReceipt = new MatrixReceiptModel();
    this.utilHelper.modelCopy(r, this.modalRef.content.matrixReceipt);
    this.modalRef.content.bankAccountChange(r.bankAccount);
  }




  addMatrixReceipt() {
    this.isAddNew = true;
    const matrixReceipt = new MatrixReceiptModel();
    this.modalRef = this.modalService.show(UpdateMatrixReceiptComponent, { backdrop: 'static' });
    this.modalRef.content.title = 'Add Matrix Receipt';
    matrixReceipt.rln = (this.matrixReceipts.length + 1);
    this.modalRef.content.matrixReceipt = matrixReceipt;
  }



}
