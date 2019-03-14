import { Component, ViewChild } from '@angular/core';
// import { RemarkCollectionService } from '../service/remark.collection.service';
import { TabsComponent } from '../shared/tabs/tabs.component';
// import { ReceiptModel } from '../models/passive-receipt.model';
// import { RemarkGroup, ReceiptGroup } from '../models/remark.group.model';
// import { DatePipe } from '@angular/common';

declare var smartScriptSession: any;

@Component({
    selector: 'app-payment',
    template: `
    <my-tabs>
      <my-tab [tabTitle]="'Receipts'">
        <h3>List of Receipts</h3>
        <receipts-list
          [receipts]="receipts"
          (addReceipt)="onAddReceipt()"
          (editReceipt)="onEditReceipt($event)">
        </receipts-list>
        <hr />
      </my-tab>
    </my-tabs>

    
  `
})

// <ng-template let-receipt="receipt" #receiptEdit>
//       <receipt-edit [receipt]="receipt" (saveReceipt)="onReceiptFormSubmit($event)"></receipt-edit>
//     </ng-template>
export class PaymentComponent{
    @ViewChild('receiptEdit') editReceiptTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    receipts = [];

    // constructor(private remarkCollectionService:RemarkCollectionService){
      
    // }
    
  
    onEditReceipt(receipt) {
        this.tabsComponent.openTab(
        `Editing ${receipt.suppliername}`,
        this.editReceiptTemplate,
        receipt,
        true
        );
    }

    onAddReceipt() {
        this.tabsComponent.openTab('New Receipt', this.editReceiptTemplate, {}, true);
    }

    onReceiptFormSubmit(dataModel) {
        if (dataModel.id > 0) {
        this.receipts = this.receipts.map(receipt => {
            if (receipt.id === dataModel.id) {
            return dataModel;
            } else {
            return receipt;
            }
        });
        } else {
        // create a new one
        dataModel.id = Math.round(Math.random() * 100);
        this.receipts.push(dataModel);
        // this.buildRemark(dataModel);
        }

        // close the tab
        this.tabsComponent.closeActiveTab();
    }

    // buildRemark(dataModel){
    //   var pasGroup = new PassiveReceiptGroup();
    //   pasGroup.group = dataModel.id
    //   var passive = new PassiveReceiptModel();
    //   var datePipe = new DatePipe("en-US");
      
    //   passive.endDate = dataModel.endDate;
    //   passive.vendor = "1A";
    //   passive.passiveReceiptType = "Tour";
    //   passive.startDate = datePipe.transform(dataModel.startDate, 'ddMMyy');
    //   passive.endDate= datePipe.transform(dataModel.endDate, "ddMMyy")
    //   passive.startTime = "";
    //   passive.endTime="";
    //   passive.startPoint= dataModel.from;
    //   passive.endPoint = dataModel.to;
    //   passive.quantity = 1;
      
    //   var datePipe = new DatePipe("en-US");
    //   var startdatevalue = datePipe.transform(dataModel.startDate, 'ddMMM');
    //   var enddatevalue = datePipe.transform(dataModel.endDate, "ddMM")
    //   var startTime = (<string>dataModel.startTime).replace(':','');
    //   var endTime = (<string>dataModel.endTime).replace(':','');
    //   passive.status = "HK";

    //   var freetext ="TYP-TOR/SUC-ZZ/SC" + dataModel.startPoint + "/SD-" + startdatevalue +
    //                  "/ST-" + startTime + "/EC-" + dataModel.endPoint + "/ED-" + 
    //                  enddatevalue + "/ET-" + endTime + "/PS-1" ;
      
    //   passive.freeText = freetext;
    //   pasGroup.passiveReceipt = new Array<PassiveReceiptModel>();
    //   pasGroup.passiveReceipt.push(passive);
      
    //   this.remarkCollectionService.addUpdatePassiveReceiptGroup(pasGroup);
      
    //   }

}
