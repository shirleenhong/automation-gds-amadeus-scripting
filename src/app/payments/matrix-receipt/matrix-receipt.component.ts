import { Component, OnInit, Input } from '@angular/core';
import { MatrixReceiptModel } from '../../models/pnr/matrix-receipt.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UpdateMatrixReceiptComponent } from '../update-matrix-receipt/update-matrix-receipt.component';

@Component({
  selector: 'app-matrix-receipt',
  templateUrl: './matrix-receipt.component.html',
  styleUrls: ['./matrix-receipt.component.scss']
})
export class MatrixReceiptComponent implements OnInit {

  @Input()
  matrixReceipts: MatrixReceiptModel[] = [];
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  addMatrixReceipt() {
    const matrixReceipt = new MatrixReceiptModel();
    this.modalRef = this.modalService.show(UpdateMatrixReceiptComponent, { backdrop: 'static' });
    this.modalRef.content.title = 'Add Matrix Receipt';
    matrixReceipt.rln = (this.matrixReceipts.length + 1);
    this.modalRef.content.matrixReceipt = matrixReceipt;
    this.modalService.onHide.subscribe(result => {
      if (this.modalRef.content.isSubmitted) {
        this.matrixReceipts.push(this.modalRef.content.matrixReceipt);
        this.modalRef.content.isSubmitted = false;
      }
      console.log('results', result);
    });

  }



}
