import { Injectable } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { QueuePlaceModel } from 'src/app/models/pnr/queue-place.model';
import { formatDate, DatePipe } from '@angular/common';
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
  data: any[] = [];
  queueCtr = '';
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
    const moveSegment = queueForm.get('moveSegment').value ? '-SC(' + queueForm.get('moveSegment').value + ')' : '';
    const creationDate = queueForm.get('creationDate').value ? '-CD(' + queueForm.get('creationDate').value + ')' : '';
    const tk = queueForm.get('moveTk').value ? '-TK(' + queueForm.get('moveTk').value + ')' : '';
    const moveTravelDate = queueForm.get('travelDate1').value
      ? queueForm.get('travelDate2').value
        ? ',DD(' + queueForm.get('travelDate1').value + ',' + queueForm.get('travelDate2').value + ')'
        : ',DD(' + queueForm.get('travelDate1').value + ')'
      : '';

    rmGroup.cryptics.push(
      'QV' + moveOid + queueForm.get('toQueueNumber').value + toCat + moveCarrier + moveSegment + creationDate + tk + moveTravelDate
    );
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

      const dateNow = new DatePipe('en-US').transform(new Date(), 'ddMMM').toString();
      accessForm.get('remarks').value.forEach((element) => {
        rmGroup.remarks.push(
          this.remarkHelper.getRemark('C-TQ' + accessForm.get('placeQueueNumber').value + '-' + dateNow + '-' + element, 'RM', 'G')
        );
      });
    }
    let qmCommand = 'QE50C200';
    if (accessForm.get('placeQueueNumber').value && accessForm.get('placeQueueCat').value) {
      qmCommand = 'QM50C200';
      if (accessForm.get('alternateOid').value) {
        qmCommand += '/' + accessForm.get('alternateOid').value;
      }
      qmCommand += '/' + accessForm.get('placeQueueNumber').value + 'C' + accessForm.get('placeQueueCat').value;
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
    this.data = [];
    this.data.push({
      date: 'DATE',
      time: 'TIME',
      bookingoid: 'BOOKING OID',
      pnrLocator: 'PNR LOCATOR',
      cicCode: 'CIC Code',
      trackingCode: 'TRACKING CODE',
      action: 'ACTION / NO ACTION'
    });
    await smartScriptSession.send('IG');
    await smartScriptSession
      .send(
        'QS' +
          productivityReportForm.productivityReportForm.get('queueNumber').value +
          'C' +
          productivityReportForm.productivityReportForm.get('category').value
      )
      .then(async (res) => {
        this.queueCtr = await this.getQueueCount(res);
        if (this.queueCtr === '') {
          await smartScriptSession.send('QI');
        } else if (this.queueCtr === '0') {
          await this.parseRSJRemark('single');
        } else {
          await this.parseRSJRemark('multiple');
          await this.parseRSJRemark('single');
        }
      });
    if (this.data.length > 1) {
      const report = new AngularCsv(this.data, productivityReportForm.productivityReportForm.get('forClosing').value);
      if (report) {
      }
    }
  }

  async parseRSJRemark(type) {
    if (type === 'single') {
      await smartScriptSession.send('RTRJ').then(async (x) => {
        const rgx = /\d{1,3} RMJ (.*)/g;
        const rmj = rgx.exec(x.Response);
        if (rmj && !rmj.toLocaleString().includes('NO ELEMENT FOUND')) {
          const rmjA = rmj[1].split('/');
          const rmjB = rmjA[1].split('-');
          let rmjLinenumber = '';
          rmjLinenumber = rmj[0].split(' ')[0];
          this.data.push({
            date: rmjA[0].split('-')[1],
            time: rmjB[0],
            bookingoid: rmjB[1],
            pnrLocator: rmjB[2],
            cicCode: rmjB[3],
            trackingCode: rmjB[4],
            action: rmjB[4][rmjB[4].length - 1] === 'A' ? 'A' : ''
          });
          await smartScriptSession.send('XE' + rmjLinenumber);
          await smartScriptSession.send('RFCWT');
          await smartScriptSession.send('ER');
          await smartScriptSession.send('ER');
          await smartScriptSession.send('QN');
          await smartScriptSession.send('QI');
        } else {
          await smartScriptSession.send('IG');
        }
      });
    } else if (type === 'multiple') {
      let ctr: number;
      ctr = 0;

      while (ctr !== Number(this.queueCtr)) {
        await smartScriptSession.send('RTRJ').then(async (x) => {
          const rgx = /\d{1,3} RMJ (.*)/g;
          const rmj = rgx.exec(x.Response);
          let rmjLinenumber = '';
          if (rmj) {
            const rmjA = rmj[1].split('/');
            const rmjB = rmjA[1].split('-');
            rmjLinenumber = rmj[0].split(' ')[0];
            this.data.push({
              date: rmjA[0].split('-')[1],
              time: rmjB[0],
              bookingoid: rmjB[1],
              pnrLocator: rmjB[2],
              cicCode: rmjB[3],
              trackingCode: rmjB[4],
              action: rmjB[4][rmjB[4].length - 1] === 'A' ? 'A' : ''
            });
          }
          ctr++;
          if (ctr !== Number(this.queueCtr)) {
            await smartScriptSession.send('XE' + rmjLinenumber);
            await smartScriptSession.send('RFCWT');
            await smartScriptSession.send('ER');
            await smartScriptSession.send('ER');
            await smartScriptSession.send('QN');
          }
        });
      }
      await smartScriptSession.send('IG');
    }
  }

  getQueueCount(res): string {
    const errorMessages = [{ Keyword: 'ERROR' }, { Keyword: 'INVALID' }, { Keyword: 'EMPTY' }, { Keyword: 'NOT ASSIGNED' }];
    for (const x of errorMessages) {
      if (res.Response.toString().includes(x.Keyword)) {
        return '';
      }
    }

    const regex = /\(\d{1,3}\)/g;
    const match = regex.exec(res.Response);
    let queueCtr = '';
    if (match[0] !== null) {
      queueCtr = match[0].replace('(', '');
      queueCtr = queueCtr.replace(')', '');
    }
    return queueCtr;
  }
}
