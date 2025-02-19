import { Injectable } from '@angular/core';
import { RemarksManagerService } from './remarks-manager.service';
import { RemarkGroup } from 'src/app/models/pnr/remark.group.model';
import { FormGroup, FormArray } from '@angular/forms';
import { formatDate } from '@angular/common';
import { RemarkModel } from 'src/app/models/pnr/remark.model';
import { RemarkHelper } from 'src/app/helper/remark-helper';
import { AmadeusQueueService } from '../amadeus-queue.service';
import { QueuePlaceModel } from 'src/app/models/pnr/queue-place.model';
import { PnrService } from '../pnr.service';

@Injectable({
    providedIn: 'root'
})
export class CorpCancelRemarkService {
    constructor(
        private remarksManager: RemarksManagerService,
        private remarkHelper: RemarkHelper,
        private queService: AmadeusQueueService,
        private pnrService: PnrService
    ) { }

    WriteNonBspTicketCredit(group: FormGroup) {
        const curDate = formatDate(new Date(), 'ddMMM', 'en-US');
        const remarkList = new Array<RemarkModel>();
        if (group.get('hasU14').value) {
            if (group.get('isReCredit').value === 'N') {
                this.createRemarks(['VendorName', 'BackOfficeAgentIdentifier'], [group.get('vendor').value, group.get('officeId').value]);
                this.createRemarks(
                    ['CurrentDate', 'CounselorLastName', 'CounselorFirstName'],
                    [curDate, group.get('lastName').value, group.get('firstName').value]
                );

                this.createRemarks(
                    ['PartialFull', 'CurrentDate'],
                    [group.get('partialFull').value === 'full' ? 'FULL' : 'PART', curDate],
                    'RECREDIT'
                );

                if (group.get('partialFull').value !== 'full') {
                    this.createRemarks(
                        ['BaseAmt', 'Gst', 'Tax'],
                        [group.get('baseAmount').value, group.get('gst').value, group.get('tax').value],
                        'RECREDIT'
                    );
                    this.createRemarks(['Commission'], [group.get('commission').value]);
                    if (group.get('freeFlow1').value) {
                        remarkList.push(this.remarkHelper.createRemark('.  ' + group.get('freeFlow1').value, 'RM', 'X'));
                    }
                    if (group.get('freeFlow2').value) {
                        remarkList.push(this.remarkHelper.createRemark('.  ' + group.get('freeFlow2').value, 'RM', 'X'));
                    }
                }

                this.queueNonBspTicket();
                return { remarks: remarkList, commands: [] };
            }
        } else {
            this.createRemarks(['CurrentDate', 'DocTicketNum'], [curDate, group.get('ticketNum').value]);
        }
        this.queueNonBspTicket();
        return null;
    }

    buildVoidRemarks(cancel: any, isUSOID: boolean, invoiceNumber?: string) {
        const dateToday = formatDate(new Date(), 'ddMMM', 'en-US');
        let remarkSet = new Map<string, string>();

        const rmGroup = new RemarkGroup();
        rmGroup.group = 'Void';
        rmGroup.remarks = new Array<RemarkModel>();

        if (cancel.value.followUpOption === 'Void BSP') {
            remarkSet = new Map<string, string>();
            remarkSet.set('VoidDate', dateToday);
            if (cancel.value.authorization) {
                remarkSet.set('Auth', cancel.value.authorization);
                this.remarksManager.createPlaceholderValues(remarkSet, null, null);
            }

            let ctr = 0;
            for (const tickets of cancel.value.ticketVoidList) {
                if (tickets) {
                    const tkt = /PAX\s(?<carrier>[0-9]{3})-(?<ticket>[0-9]{10})/.exec(cancel.value.ticketList[ctr].freeFlowText);
                    if (isUSOID) {
                        const reason = cancel.value.vRsnOption === 'AGENCY' ? 'A' : 'P';
                        const branch = this.pnrService.getRemarkText('BB/-').replace('BB/-', '');
                        const iata = cancel.value.ticketList[ctr].freeFlowText.split('/')[3].trim();
                        const fare = /[0-9\.]+/.exec(cancel.value.ticketList[ctr].freeFlowText.split('/')[2])[0];
                        rmGroup.remarks.push(
                            this.getRemarksModel(
                                // tslint:disable-next-line: max-line-length
                                `${reason}/${dateToday}-${formatDate(new Date(), 'HHmm', 'en-US')}/${branch}/${iata}/${tkt.groups.ticket}/${invoiceNumber}/${fare}`,
                                'RM',
                                'X'));
                    } else {
                        remarkSet = new Map<string, string>();
                        remarkSet.set('VTkt', `${tkt.groups.carrier}-${tkt.groups.ticket}`);
                        this.remarksManager.createPlaceholderValues(remarkSet, null, null);
                    }
                }
                ctr = ctr + 1;
            }

            if (cancel.value.cFirstInitial.trim() !== '' && cancel.value.cLastName.trim() !== '') {
                remarkSet = new Map<string, string>();
                remarkSet.set('VoidDate', dateToday);
                remarkSet.set('CounselorFirstName', cancel.value.cFirstInitial);
                remarkSet.set('CounselorLastName', cancel.value.cLastName);
                this.remarksManager.createPlaceholderValues(remarkSet, null, null);
            }

            if (!isUSOID && cancel.value.vRsnOption) {
                remarkSet = new Map<string, string>();
                remarkSet.set('VRsn', cancel.value.vRsnOption);
                this.remarksManager.createPlaceholderValues(remarkSet, null, null);
            }
        } else if (cancel.value.followUpOption === 'Void Non BSP') {
            remarkSet = new Map<string, string>();
            remarkSet.set('RevType', cancel.value.reverseItem);
            this.remarksManager.createPlaceholderValues(remarkSet, null, null);
            remarkSet = new Map<string, string>();
            remarkSet.set('VoidDate', dateToday);
            if (cancel.value.cFirstInitial.trim !== '' && cancel.value.cLastName.trim !== '') {
                remarkSet.set('CounselorFirstName', cancel.value.cFirstInitial);
                remarkSet.set('CounselorLastName', cancel.value.cLastName);
                this.remarksManager.createPlaceholderValues(remarkSet, null, null);
            }
            if (!isUSOID && cancel.value.vRsnOption) {
                remarkSet = new Map<string, string>();
                remarkSet.set('VRsn', cancel.value.vRsnOption);
                this.remarksManager.createPlaceholderValues(remarkSet, null, null);
            }
            if (cancel.value.otherDetails1.trim !== '') {
                rmGroup.remarks.push(this.getRemarksModel(cancel.value.otherDetails1, 'RM', 'X'));
            }
            if (cancel.value.otherDetails2.trim !== '') {
                rmGroup.remarks.push(this.getRemarksModel(cancel.value.otherDetails2, 'RM', 'X'));
            }
        }

        this.queService.addQueueCollection(new QueuePlaceModel(this.pnrService.extractOidFromBookRemark(), 41, 85));
        return rmGroup;
    }

    public getRemarksModel(remText, type, cat, segment?: string) {
        let segmentrelate = [];
        if (segment) {
            segmentrelate = segment.split(',');
        }
        const rem = new RemarkModel();
        rem.category = cat;
        rem.remarkText = remText;
        rem.remarkType = type;
        rem.relatedSegments = segmentrelate;
        return rem;
    }

    writeAquaTouchlessRemark(cancel: any, isUSOID: boolean) {
        if (
            cancel.value.followUpOption === 'BSPKT' ||
            cancel.value.followUpOption === 'NONBSPKT' ||
            cancel.value.followUpOption === 'NONBSPREFUND' ||
            cancel.value.followUpOption === 'HOTELCARLIMO'
        ) {
            if (!isUSOID) {
                const bbExist = this.remarksManager.getMatchedPlaceHoldersWithKey('MatrixLineBB');
                const remarkText = this.pnrService.getRemarkText('AQUA CHG-RM*BB/-');
                let value = '';
                if (bbExist) {
                    if (remarkText !== '') {
                        const regex = /(?<BB>\d(.*))/g;
                        const match = regex.exec(remarkText);
                        regex.lastIndex = 0;
                        if (match !== null) {
                            value = match[0];
                            this.createRemarks(['MatrixLineBB'], [value]);
                        }
                    }
                }
            }
            this.queService.addQueueCollection(new QueuePlaceModel(this.pnrService.extractOidFromBookRemark(), 70, 1));
            if (!isUSOID && cancel.value.followUpOption === 'HOTELCARLIMO') {
                this.queService.addQueueCollection(new QueuePlaceModel('YTOWL210E', '70', '1'));
            }
        }
    }

    private queueNonBspTicket() {
        this.queService.addQueueCollection(new QueuePlaceModel('YTOWL210O', 41, 98));
        this.queService.addQueueCollection(new QueuePlaceModel('YTOWL210E', 60, 1));
    }

    private createRemarks(keys, values, statictext?) {
        const map = new Map<string, string>();
        keys.forEach((key, i) => {
            map.set(key, values[i]);
        });
        this.remarksManager.createPlaceholderValues(map, null, null, null, statictext);
    }
    sendEBRemarks(cancelForm: FormGroup) {
        const map = new Map<string, string>();
        map.set('TouchCode', cancelForm.controls.ebR.value);
        map.set('BookingToolCode', cancelForm.controls.ebT.value);
        map.set('ReasonType', cancelForm.controls.ebN.value);
        map.set('ReasonCode', cancelForm.controls.ebC.value);
        this.remarksManager.createPlaceholderValues(map);
    }

    WriteTicketRefund(group: FormGroup, refundType: string, isUSOID: boolean) {
        const curDate = formatDate(new Date(), 'ddMMM', 'en-US');
        const remarkList = new Array<RemarkModel>();

        if (refundType === 'bsp') {
            const arr = group.controls.tickets as FormArray;
            for (let i = 0; i < arr.length; i++) {
                const t = arr.at(i);

                if (t.get('checked').value) {
                    if (!isUSOID) {
                        this.createRemarks(['TicketNumber'], [t.get('ticketNum').value], 'REFUND PROCESSED');
                    }

                    remarkList.push(this.remarkHelper.createRemark(
                        `TKT NBR - ${t.get('ticketNum').value.replace('-', '')}, CPNS ${t.get('coupon').value}`,
                        'RM',
                        'X'));
                }
            }
            if (!isUSOID) {
                this.queService.addQueueCollection(new QueuePlaceModel('YTOWL210O', 41, 94));
            }
            let bb = this.pnrService.getRemarkText('AQUA UPDATED THE BB FROM');
            if (bb !== '') {
                bb = bb.substr(bb.length - 6);
            }
            const bb2 = this.pnrService.getRemarkText('BB/-').replace('BB/-', '');
            if (bb !== '' && bb2 !== '' && bb !== bb2) {
                this.createRemarks(['MatrixLineBB'], [bb]);
            }
        } else {
            this.createRemarks(['VendorName', 'BackOfficeAgentIdentifier'], [group.get('supplier').value, group.get('officeId').value]);
            this.createRemarks(['PartialFull', 'CurrentDate'],
                [group.get('partialFull').value === 'full' ? 'FULL' : 'PART', curDate], 'REFUND');
            if (group.get('freeFlow1').value) {
                remarkList.push(this.remarkHelper.createRemark('.  ' + group.get('freeFlow1').value, 'RM', 'X'));
            }
            if (group.get('freeFlow2').value) {
                remarkList.push(this.remarkHelper.createRemark('.  ' + group.get('freeFlow2').value, 'RM', 'X'));
            }
            let invoice = group.get('invoice').value;
            if (invoice && invoice.trim() !== '') {
                invoice = '- ORIG INV ' + group.get('invoice').value;
            }
            const refundAmt = group.get('refundAmount').value;
            if (refundAmt && Number(refundAmt) > 0) {
                this.createRemarks(['RefundAmount', 'Commission', 'InvoiceNumber'], [refundAmt, group.get('commission').value, invoice]);
            } else {
                this.createRemarks(['Commission', 'InvoiceNumber'], [group.get('commission').value, invoice]);
            }
            if (group.get('partialFull').value !== 'full') {
                this.createRemarks(
                    ['BaseAmt', 'Gst', 'Tax'],
                    [group.get('baseAmount').value, group.get('gst').value, group.get('tax').value],
                    'REFUND'
                );
            }
            this.queueNonBspTicket();
        }

        return { remarks: remarkList, commands: [] };
    }
}
