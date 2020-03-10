import { Injectable } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { QueuePlaceModel } from 'src/app/models/pnr/queue-place.model';
import { formatDate } from '@angular/common';
import { AmadeusQueueService } from '../amadeus-queue.service';
import { QueueReportComponent } from 'src/app/corporate/queue-report/queue-report.component';
import { RemarkModel } from 'src/app/models/pnr/remark.model';
import { RemarkGroup } from 'src/app/models/pnr/remark.group.model';
import { RemarkHelper } from 'src/app/helper/remark-helper';
import { PnrService } from '../pnr.service';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';

declare var smartScriptSession: any;
@Injectable({
  providedIn: 'root'
})
export class QueueService {
  pnrList: string[] = [];
  constructor(private queueRemarksService: AmadeusQueueService, private remarkHelper: RemarkHelper, private pnrService: PnrService) {}

  public getQueuePlacement(queueGroup: FormGroup): void {
    const items = queueGroup.get('queues') as FormArray;

    for (const group of items.controls) {
      const queue = new QueuePlaceModel();
      queue.pcc = group.get('oid').value;
      queue.date = formatDate(Date.now(), 'ddMMyy', 'en').toString();
      queue.queueNo = group.get('queueNumber').value;
      queue.category = group.get('category').value;
      this.queueRemarksService.addQueueCollection(queue);
    }
  }

  public async oidQueuePlacement() {
    await smartScriptSession.send('QC7CE');
    await smartScriptSession.send('QAM7C1');
    await smartScriptSession.send('QAC7c1-8');
    await smartScriptSession.send('QAN7C6');
    await smartScriptSession.send('QAN7C7');
    await smartScriptSession.send('QAC7c11-11');
    await smartScriptSession.send('QAC7c14-14');
    await smartScriptSession.send('QAC7c16-16');
    await smartScriptSession.send('QC7CE');
  }

  public async queueProductivityReport(reportComp: QueueReportComponent) {
    const queueForm: FormGroup = reportComp.queueReportForm;
    const rmGroup = new RemarkGroup();
    rmGroup.group = 'Routing';
    rmGroup.remarks = new Array<RemarkModel>();
    rmGroup.cryptics = new Array<string>();
    rmGroup.deleteRemarkByIds = new Array<string>();

    switch (queueForm.get('queueReport').value) {
      case 'MOVE':
        await this.moveNewQueue(reportComp.moveQueueComponent.moveQueueForm, rmGroup);
        break;
      case 'ACCESS':
        await this.accessQueue(reportComp.accessQueueComponent.accessQueueForm, rmGroup);
        break;
      case 'PRODUCTIVITY':
        await this.generateProductivityReport(reportComp.productivityReportComponent);
        break;
    }

    return rmGroup;
  }

  public async initializeQueueReport() {
    await smartScriptSession.send('IG');
  }

  private async moveNewQueue(queueForm, rmGroup) {
    const fromCat = queueForm.get('fromQueueCategory').value ? 'C' + queueForm.get('fromQueueCategory').value : '';
    const toCat = queueForm.get('toQueueCategory').value ? 'C' + queueForm.get('toQueueCategory').value : '';
    const command = queueForm.get('removeQueue').value ? 'QB' : 'QBR';

    // await smartScriptSession.send();
    rmGroup.cryptics.push(command + queueForm.get('fromQueueNumber').value + fromCat + '-' + queueForm.get('toQueueNumber').value + toCat);

    const moveOid = queueForm.get('oid').value ? '/' + queueForm.get('oid').value : '';
    const moveCarrier = queueForm.get('carrier').value ? '-AC(' + queueForm.get('carrier').value + ')' : '';
    const moveTravelDate = queueForm.get('travelDate1').value
      ? queueForm.get('travelDate2').value
        ? ',DD(' + queueForm.get('travelDate1').value + ',' + queueForm.get('travelDate2').value + ')'
        : ',DD(' + queueForm.get('travelDate1').value + ')'
      : '';

    rmGroup.cryptics.push('QV' + moveOid + queueForm.get('toQueueNumber').value + toCat + moveCarrier + moveTravelDate);
  }

  private async accessQueue(accessForm, rmGroup) {
    if (accessForm.get('queueOption').value === 'QUEUE') {
      const queueCat = accessForm.get('accessQueueCat').value ? 'C' + accessForm.get('accessQueueCat').value : '';
      rmGroup.cryptics.push('QS' + accessForm.get('accessQueueNumber').value + queueCat);
    } else {
      await smartScriptSession.send('RT' + accessForm.get('recordLocator').value);
      await this.pnrService.getPNR();
      const oid = this.pnrService.extractOidFromBookRemark();
      const action = accessForm.get('action').value ? 'A' : '';

      rmGroup.remarks.push(
        this.remarkHelper.getRemark(
          'QPROD-' +
            formatDate(new Date(), 'ddMMM', 'en-US').toUpperCase() +
            '/' +
            formatDate(new Date(), 'HHmm', 'en-US').toUpperCase() +
            '-' +
            oid +
            '-' +
            accessForm.get('recordLocator').value +
            '-' +
            this.getCICNumber() +
            '-' +
            accessForm.get('tracking').value +
            action,
          'RM',
          'J'
        )
      );

      accessForm.get('remarks').value.array.forEach((element) => {
        rmGroup.remarks.push(this.remarkHelper.getRemark(element, 'RM', 'G'));
      });
    }
    let qmCommand = 'QE50C200';
    if (accessForm.get('placeQueueNumber').value && accessForm.get('placeQueueCat').value) {
      if (accessForm.get('alternateOid').value) {
        qmCommand += '/' + accessForm.get('alternateOid').value;
      }
      qmCommand += '/' + accessForm.get('placeQueueNumber').value + 'C' + accessForm.get('placeQueueNumber').value;
    }
    rmGroup.cryptics.push(qmCommand);
  }

  getCICNumber() {
    const remark = this.pnrService.getRemarkText('CN/-');
    const regex = /(?<=CN\/-).*$/g;

    const match = regex.exec(remark);
    if (match !== null) {
      return match[0];
    }
    return '';
  }

  private async generateProductivityReport(productivityReportForm) {
    const data: any[] = [];
    await smartScriptSession.send('QI');
    await smartScriptSession
      .send(
        'QS' +
          productivityReportForm.productivityReportForm.get('queueNumber').value +
          'C' +
          productivityReportForm.productivityReportForm.get('category').value
      )
      .then(async (res) => {
        const regex = /\(\d{1,2}\)/g;
        const match = regex.exec(res.Response);
        let queueCtr: any;

        if (match[0] !== null) {
          queueCtr = match[0].replace('(', '');
          queueCtr = queueCtr.replace(')', '');
        }

        data.push({
          date: 'DATE',
          time: 'TIME',
          bookingoid: 'BOOKING OID',
          pnrLocator: 'PNR LOCATOR',
          cicCode: 'CIC CODE',
          trackingCode: 'TRACKING CODE',
          action: 'ACTION / NO ACTION'
        });

        queueCtr = Number(queueCtr);
        let counter = 0;
        while (counter < queueCtr) {
          await smartScriptSession.send('QD');
          await this.pnrService.getPNR();
          this.pnrList.push(this.pnrService.pnrObj.header.recordLocator.toString());
          counter++;
          if (this.pnrService.pnrObj) {
            this.pnrService.pnrObj.rmElements.forEach((x) => {
              if (x.category === 'J') {
                const t1 = x.freeFlowText.split('/');
                const t2 = t1[1].split('-');
                data.push({
                  date: t1[0].split('-')[1],
                  time: t2[0],
                  bookingoid: t2[1],
                  pnrLocator: t2[2],
                  cicCode: t2[3],
                  trackingCode: t2[4],
                  action: t2[4][t2[4].length - 1] === 'A' ? '' : 'Action'
                });
              }
            });
          }

          if (counter === queueCtr) {
            const report = new AngularCsv(data, productivityReportForm.manualFileName);
            if (report) {
              smartScriptSession.send('QI');
            } else {
              // to do for failed report
              smartScriptSession.send('QI');
            }
          }
        }
      });
  }
}
