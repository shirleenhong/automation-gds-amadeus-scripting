import { RemarkModel } from '../../models/pnr/remark.model';
import { PnrService } from '../pnr.service';
import { Injectable } from '@angular/core';
import { RemarkGroup } from '../../models/pnr/remark.group.model';
import { DatePipe, DecimalPipe } from '@angular/common';
import { formatDate } from '@angular/common';
import { FormGroup, FormArray } from '@angular/forms';
import { RemarkHelper } from '../../helper/remark-helper';
import { PackageRemarkHelper } from '../../helper/packageRemark-helper';
import { RBCRedemptionModel } from '../../models/pnr/rbc-redemption.model';

@Injectable({
  providedIn: 'root'
})
export class RemarkService {
  decPipe = new DecimalPipe('en-US');
  rbcForDeletion = [];

  constructor(private remarkHelper: RemarkHelper, private packageRemarkHelper: PackageRemarkHelper, private pnrService: PnrService) { }

  public GetITCPackageRemarks(group: any) {
    const rmGroup = new RemarkGroup();
    rmGroup.group = 'Tour Package';
    rmGroup.remarks = new Array<RemarkModel>();
    const datePipe = new DatePipe('en-US');

    this.packageRemarkHelper.getForDeletion().forEach((c) => {
      rmGroup.deleteRemarkByIds.push(c);
    });
    this.packageRemarkHelper.clearForDeletionRemarks();

    rmGroup.remarks.push(this.remarkHelper.createRemark('THE FOLLOWING COSTS ARE SHOWN IN ' + group.value.itcCurrencyType, 'RI', 'R'));

    if (Number(group.value.noAdult) > 0) {
      rmGroup.remarks.push(this.processRIRRemark('ADULT PRICE', group.value.baseAdult, group.value.noAdult));
      rmGroup.remarks.push(this.processRIRRemark('ADULT TAXES', group.value.taxAdult, group.value.noAdult));
      rmGroup.remarks.push(this.processRIRRemark('ADULT INSURANCE', group.value.insAdult, group.value.noAdult));
      rmGroup.remarks.push(this.processRIRRemark('ADULT CRUISE', group.value.bcruiseAdult, group.value.noAdult));
      rmGroup.remarks.push(this.processRIRRemark('ADULT TAX/PORT CHARGES', group.value.tcruiseAdult, group.value.noAdult));
      rmGroup.remarks.push(this.processRIRRemark('ADULT RAIL', group.value.railAdult, group.value.noAdult));
    }

    if (Number(group.value.noChild) > 0) {
      rmGroup.remarks.push(this.processRIRRemark('CHILD PRICE', group.value.baseChild, group.value.noChild));
      rmGroup.remarks.push(this.processRIRRemark('CHILD TAXES', group.value.taxChild, group.value.noChild));
      rmGroup.remarks.push(this.processRIRRemark('CHILD INSURANCE', group.value.insChild, group.value.noChild));
      rmGroup.remarks.push(this.processRIRRemark('CHILD CRUISE', group.value.bcruiseChild, group.value.noChild));
      rmGroup.remarks.push(this.processRIRRemark('CHILD TAX/PORT CHARGES', group.value.tcruiseChild, group.value.noChild));
      rmGroup.remarks.push(this.processRIRRemark('CHILD RAIL', group.value.railChild, group.value.noChild));
    }

    if (Number(group.value.noInfant) > 0) {
      rmGroup.remarks.push(this.processRIRRemark('INFANT PRICE', group.value.baseInfant, group.value.noInfant));
      rmGroup.remarks.push(this.processRIRRemark('INFANT TAXES', group.value.taxInfant, group.value.noInfant));
      rmGroup.remarks.push(this.processRIRRemark('INFANT INSURANCE', group.value.insInfant, group.value.noInfant));
      rmGroup.remarks.push(this.processRIRRemark('INFANT CRUISE', group.value.bcruiseInfant, group.value.noInfant));
      rmGroup.remarks.push(this.processRIRRemark('INFANT TAX/PORT CHARGES', group.value.tcruiseInfant, group.value.noInfant));
      rmGroup.remarks.push(this.processRIRRemark('INFANT RAIL', group.value.railInfant, group.value.noInfant));
    }

    rmGroup.remarks.push(this.processRIRRemark('HOTEL/ACCOMMODATION', group.value.hotelAdult, null));

    rmGroup.remarks.push(this.processRIRRemark('CAR RENTAL', group.value.carAdult, null));

    rmGroup.remarks.push(this.processRIRRemark('TOTAL HOLIDAY COST', parseFloat(group.value.holidayCost), null));

    rmGroup.remarks.push(this.processRIRRemark('LESS DEPOSIT PAID', group.value.depAdult, null));

    rmGroup.remarks.push(this.processRIRRemark('BALANCE DUE', group.value.balance, null));

    if (group.value.dueDate) {
      rmGroup.remarks.push(
        this.remarkHelper.createRemark(
          '---- BALANCE OF ' + group.value.balance + ' IS DUE ' + datePipe.transform(group.value.dueDate, 'dMMMyy') + ' ----',
          'RI',
          'R'
        )
      );
    }
    this.deleteRemarks(['U43/-', 'U41/-', 'U42/-'], rmGroup);
    if (group.value.dueDate.length > 0) {
      rmGroup.remarks.push(this.remarkHelper.createRemark('U43/-' + datePipe.transform(group.value.dueDate, 'MMMyy'), 'RM', '*'));
    }

    if (group.value.balance.length > 0) {
      rmGroup.remarks.push(this.remarkHelper.createRemark('U41/-' + group.value.balance, 'RM', '*'));
    }

    if (group.value.commission.length > 0) {
      rmGroup.remarks.push(this.remarkHelper.createRemark('U42/-' + group.value.commission, 'RM', '*'));
    }

    return rmGroup;
  }

  deleteRemarks(udids, rmGroup, type?) {
    udids.forEach((x) => {
      let existNumber = '';
      if (type === 'RIR') {
        existNumber = this.pnrService.getRIRLineNumber(x);
      } else {
        existNumber = this.pnrService.getRemarkLineNumber(x);
      }

      if (existNumber !== '') {
        rmGroup.deleteRemarkByIds.push(existNumber);
      }
    });
  }

  public GetTourPackageRemarks(group: FormGroup) {
    const rmGroup = new RemarkGroup();
    rmGroup.group = 'Tour Package';
    rmGroup.remarks = new Array<RemarkModel>();
    const datePipe = new DatePipe('en-US');

    if (this.packageRemarkHelper.getForDeletion() !== undefined) {
      this.packageRemarkHelper.getForDeletion().forEach((c) => {
        rmGroup.deleteRemarkByIds.push(c);
      });
      this.packageRemarkHelper.clearForDeletionRemarks();
    }

    rmGroup.remarks.push(
      this.remarkHelper.createRemark('THE FOLLOWING COSTS ARE SHOWN IN ' + group.controls.tourCurrencyType.value, 'RI', 'R')
    );

    if (Number(group.controls.adultNum.value) > 0) {
      rmGroup.remarks.push(this.processRIRRemark('ADULT PACKAGE', group.controls.baseCost.value, group.controls.adultNum.value));
      rmGroup.remarks.push(this.processRIRRemark('ADULT TAXES', group.controls.taxesPerAdult.value, group.controls.adultNum.value));
      rmGroup.remarks.push(this.processRIRRemark('ADULT INSURANCE', group.controls.insurancePerAdult.value, group.controls.adultNum.value));
    }

    if (Number(group.controls.childrenNumber.value) > 0) {
      rmGroup.remarks.push(this.processRIRRemark('CHILD PACKAGE', group.controls.childBaseCost.value, group.controls.childrenNumber.value));
      rmGroup.remarks.push(this.processRIRRemark('CHILD TAXES', group.controls.taxesPerChild.value, group.controls.childrenNumber.value));
      rmGroup.remarks.push(
        this.processRIRRemark('CHILD INSURANCE', group.controls.insurancePerChild.value, group.controls.childrenNumber.value)
      );
    }

    if (Number(group.controls.infantNumber.value) > 0) {
      rmGroup.remarks.push(
        this.processRIRRemark('INFANT PACKAGE', group.controls.totalCostPerInfant.value, group.controls.infantNumber.value)
      );
    }

    rmGroup.remarks.push(
      this.remarkHelper.createRemark(
        'TOTAL PACKAGE PRICE ' + (group.controls.totalCostHoliday.value === '' ? '0.00' : group.controls.totalCostHoliday.value),
        'RI',
        'R'
      )
    );
    rmGroup.remarks.push(
      this.remarkHelper.createRemark(
        'LESS DEPOSIT PAID ' +
        (group.controls.depositPaid.value === '' ? '0.00' : group.controls.depositPaid.value) +
        ' - ' +
        formatDate(Date.now(), 'dMMM', 'en'),
        'RI',
        'R'
      )
    );
    rmGroup.remarks.push(this.remarkHelper.createRemark('BALANCE DUE ' + group.controls.balanceToBePaid.value, 'RI', 'R'));
    if (group.controls.balanceDueDate.value) {
      rmGroup.remarks.push(
        this.remarkHelper.createRemark(
          '---- BALANCE OF ' +
          (group.controls.balanceToBePaid.value === '' ? '0.00' : group.controls.balanceToBePaid.value) +
          ' IS DUE ' +
          datePipe.transform(group.controls.balanceDueDate.value, 'dMMMyy') +
          ' ----',
          'RI',
          'R'
        )
      );
    }

    rmGroup.remarks.push(this.remarkHelper.createRemark('SOME TAXES ARE PAYABLE LOCALLY AND NOT INCLUDED ABOVE', 'RI', 'R'));
    this.deleteRemarks(['U43/-', 'U41/-', 'U42/-'], rmGroup, 'RM');
    if (group.controls.balanceDueDate.value.length > 0) {
      rmGroup.remarks.push(
        this.remarkHelper.createRemark('U43/-' + datePipe.transform(group.controls.balanceDueDate.value, 'MMMyy'), 'RM', '*')
      );
    }

    if (group.controls.balanceToBePaid.value.length > 0) {
      rmGroup.remarks.push(this.remarkHelper.createRemark('U41/-' + group.controls.balanceToBePaid.value, 'RM', '*'));
    }

    if (group.controls.commission.value.length > 0) {
      rmGroup.remarks.push(this.remarkHelper.createRemark('U42/-' + group.controls.commission.value, 'RM', '*'));
    }

    return rmGroup;
  }

  public GetPackageRemarksForDeletion() {
    const rmGroup = new RemarkGroup();
    rmGroup.group = 'Tour Package';
    rmGroup.remarks = new Array<RemarkModel>();
    this.deleteRemarks(['U43/-', 'U41/-', 'U42/-'], rmGroup);
    this.packageRemarkHelper.getForDeletion().forEach((c) => {
      rmGroup.deleteRemarkByIds.push(c);
    });
    this.packageRemarkHelper.clearForDeletionRemarks();
    return rmGroup;
  }

  public GetCodeShare(frmGroup: FormGroup) {
    const rmGroup = new RemarkGroup();
    rmGroup.group = 'Code Share';
    rmGroup.remarks = new Array<RemarkModel>();
    const arr = frmGroup.get('segments') as FormArray;
    const segmentList = this.pnrService.getSegmentList();
    const regex = /CHECK-IN AT (?<airline>.*) TICKET COUNTER/g;
    const rems = this.pnrService.getRemarksFromGDSByRegex(regex, 'RIR');
    if (rems.length > 0) {
      rmGroup.deleteRemarkByIds = [];
      rems.forEach((r) => {
        rmGroup.deleteRemarkByIds.push(r.lineNo);
      });
    }

    for (const c of arr.controls) {
      const airline = c.get('airline').value;
      const segments = c.get('segment').value.toString();
      if (arr.controls.length === 1 && airline === '' && segments === '') {
        return rmGroup;
      }
      const rm = this.remarkHelper.createRemark('CHECK-IN AT ' + airline + ' TICKET COUNTER', 'RI', 'R');
      rm.relatedSegments = [];
      const s = segments.split(',');
      segmentList.forEach((x) => {
        if (s.indexOf(x.lineNo) >= 0) {
          rm.relatedSegments.push(x.tatooNo);
        }
      });

      // rm.relatedSegments = segments.split(',');
      rmGroup.remarks.push(rm);
    }

    return rmGroup;
  }
  public GetRbcRedemptionRemarks(rbcPoints: RBCRedemptionModel[]) {
    const remGroup = new RemarkGroup();
    remGroup.group = 'RBC Remark';
    remGroup.remarks = new Array<RemarkModel>();

    if (rbcPoints !== null) {
      rbcPoints.forEach((point) => {
        this.processRbcPointsRemarks(point, remGroup.remarks);
      });
    }

    this.rbcForDeletion.forEach((c) => {
      remGroup.deleteRemarkByIds.push(c);
    });
    this.rbcForDeletion = [];
    return remGroup;
  }

  processRbcPointsRemarks(point: RBCRedemptionModel, remarkList: Array<RemarkModel>) {
    const name = point.lastname + '/' + point.firstname;
    const visa = point.firstvisanumber + 'XXXXXX' + point.lastvisanumber;
    const pointsRedeemed = point.pointsRedeemed + ' VALUE ' + point.valuepoints;
    let prodtype = point.productType;
    if (point.productType === 'OTHER') {
      prodtype = 'OTHER-' + point.othValue;
    }
    const mandatoryHotelRemarks = [
      'CARDHOLDER NAME - ' + name,
      'CARDHOLDER VISA VI' + visa + ' USED TO REDEEM POINTS',
      point.pct + ' PERCENT POINTS REDEMPTION',
      'POINTS REDEEMED ' + pointsRedeemed,
      'PRODUCT TYPE - ' + prodtype,
      'SUPPLIER NAME - ' + point.suppliername
    ];

    mandatoryHotelRemarks.forEach((c) => {
      remarkList.push(this.remarkHelper.createRemark(point.rbcNo + ' ' + c, 'RM', 'K'));
    });

    const rbcRemarks = [
      { include: point.numberbookings, description: 'NUMBER OF BOOKINGS - ' },
      { include: point.totalbasecost, description: 'TOTAL BASE COST PER BOOKING - ' },
      { include: point.noofadult, description: 'NUMBER OF ADULTS - ' },
      { include: point.totalbasecostadult, description: 'TOTAL BASE COST PER ADULT - ' }
    ];

    const rbcChildren = [
      { include: point.noofchildren, description: 'NUMBER OF CHILDREN - ' },
      { include: point.totalbasecostchild, description: 'TOTAL BASE COST PER CHILD - ' },
      { include: point.cgst, description: 'GST COST PER CHILD - ' },
      { include: point.chst, description: 'HST COST PER CHILD - ' },
      { include: point.cqst, description: 'QST COST PER CHILD - ' },
      { include: point.cotherTaxes, description: 'ALL OTHER TAXES PER CHILD - ' }
    ];

    const rbcRemarksAir = [
      { include: point.gst, description: 'GST COST  PER ADULT - ' },
      { include: point.hst, description: 'HST COST  PER ADULT - ' },
      { include: point.qst, description: 'QST COST  PER ADULT - ' },
      { include: point.otherTaxes, description: 'ALL OTHER TAXES PER ADULT - ' }
    ];

    const rbcRemarksCarHotel = [
      { include: point.gst, description: 'GST COST  PER BOOKING - ' },
      { include: point.hst, description: 'HST COST  PER BOOKING - ' },
      { include: point.qst, description: 'QST COST  PER BOOKING - ' },
      { include: point.otherTaxes, description: 'ALL OTHER TAXES PER BOOKING - ' }
    ];

    rbcRemarks.forEach((c) => {
      if (c.include) {
        remarkList.push(this.remarkHelper.createRemark(point.rbcNo + ' ' + c.description + c.include, 'RM', 'K'));
      }
    });

    if (point.numberbookings) {
      rbcRemarksCarHotel.forEach((c) => {
        if (c.include) {
          remarkList.push(this.remarkHelper.createRemark(point.rbcNo + ' ' + c.description + c.include, 'RM', 'K'));
        }
      });
    }

    if (point.noofadult) {
      rbcRemarksAir.forEach((c) => {
        if (c.include) {
          remarkList.push(this.remarkHelper.createRemark(point.rbcNo + ' ' + c.description + c.include, 'RM', 'K'));
        }
      });
    }

    rbcChildren.forEach((c) => {
      if (c.include) {
        remarkList.push(this.remarkHelper.createRemark(point.rbcNo + ' ' + c.description + c.include, 'RM', 'K'));
      }
    });
  }

  getRbcPointsRemarksFromPnr(): Array<RBCRedemptionModel> {
    const rbcModels = new Array<RBCRedemptionModel>();
    let model: RBCRedemptionModel;
    let rbcNo = '';

    for (const rm of this.pnrService.pnrObj.rmElements) {
      if (rm.category === 'K') {
        rbcNo = rm.freeFlowText.substr(0, 1);
        if (rbcNo) {
          model = rbcModels.find((x) => x.rbcNo === Number(rbcNo));
          if (model === undefined || model === null) {
            model = new RBCRedemptionModel();
            model.rbcNo = Number(rbcNo);
            rbcModels.push(model);
          }
        }
        if (rm.freeFlowText.substr(0, 1) === rbcNo) {
          if (rm.freeFlowText.indexOf('NUMBER OF BOOKINGS') > -1) {
            model.numberbookings = this.getKelements(rm);
          }
          if (rm.freeFlowText.indexOf('TOTAL BASE COST PER BOOKING') > -1) {
            model.totalbasecost = this.getKelements(rm);
          }
          if (rm.freeFlowText.indexOf('GST COST PER BOOKING') > -1) {
            model.gst = this.getKelements(rm);
          }
          if (rm.freeFlowText.indexOf('HST COST PER BOOKING') > -1) {
            model.hst = this.getKelements(rm);
          }
          if (rm.freeFlowText.indexOf('QST COST PER BOOKING') > -1) {
            model.qst = this.getKelements(rm);
          }
          if (rm.freeFlowText.indexOf('ALL OTHER TAXES PER BOOKING') > -1) {
            model.otherTaxes = this.getKelements(rm);
          }

          if (rm.freeFlowText.indexOf('GST COST PER ADULT') > -1) {
            model.gst = this.getKelements(rm);
          }
          if (rm.freeFlowText.indexOf('HST COST PER ADULT') > -1) {
            model.hst = this.getKelements(rm);
          }
          if (rm.freeFlowText.indexOf('QST COST PER ADULT') > -1) {
            model.qst = this.getKelements(rm);
          }
          if (rm.freeFlowText.indexOf('ALL OTHER TAXES PER ADULT') > -1) {
            model.otherTaxes = this.getKelements(rm);
          }

          if (rm.freeFlowText.indexOf('NUMBER OF ADULTS') > -1) {
            model.noofadult = this.getKelements(rm);
          }
          if (rm.freeFlowText.indexOf('TOTAL BASE COST PER ADULT') > -1) {
            model.totalbasecostadult = this.getKelements(rm);
          }
          if (rm.freeFlowText.indexOf('NUMBER OF CHILDREN') > -1) {
            model.noofchildren = this.getKelements(rm);
          }
          if (rm.freeFlowText.indexOf('TOTAL BASE COST PER CHILD') > -1) {
            model.totalbasecostchild = this.getKelements(rm);
          }
          if (rm.freeFlowText.indexOf('GST COST PER CHILD') > -1) {
            model.cgst = this.getKelements(rm);
          }
          if (rm.freeFlowText.indexOf('HST COST PER CHILD') > -1) {
            model.chst = this.getKelements(rm);
          }
          if (rm.freeFlowText.indexOf('QST COST PER CHILD') > -1) {
            model.cqst = this.getKelements(rm);
          }
          if (rm.freeFlowText.indexOf('ALL OTHER TAXES PER CHILD') > -1) {
            model.cotherTaxes = this.getKelements(rm);
          }
          if (rm.freeFlowText.indexOf('PRODUCT TYPE') > -1) {
            const productType = this.getKelements(rm);
            model.productType = productType;
            if (productType.substr(0, productType.indexOf('-')) === 'OTHER') {
              model.productType = 'OTHER';
              model.othValue = productType.substr(6, productType.length - 6);
            }
          }

          if (rm.freeFlowText.indexOf('SUPPLIER NAME') > -1) {
            model.suppliername = this.getKelements(rm);
          }

          let regex = /CARDHOLDER NAME - (?<lastname>.*)\/(?<firstname>.*)/g;
          let match = regex.exec(rm.freeFlowText);
          if (match) {
            model.lastname = match.groups.lastname;
            model.firstname = match.groups.firstname;
            this.rbcForDeletion.push(rm.elementNumber);
          }

          regex = /CARDHOLDER VISA VI(?<firstvisa>.*)XXXXXX(?<lastvisa>.*)/g;
          match = regex.exec(rm.freeFlowText);
          if (match) {
            model.firstvisanumber = match.groups.firstvisa;
            model.lastvisanumber = match.groups.lastvisa.replace('USED TO REDEEM POINTS', '').trim();
            this.rbcForDeletion.push(rm.elementNumber);
          }

          regex = /POINTS REDEEMED (?<pointsRedeemed>.*) VALUE (?<valuepoints>.*)/g;
          match = regex.exec(rm.freeFlowText);
          if (match) {
            model.pointsRedeemed = match.groups.pointsRedeemed;
            model.valuepoints = match.groups.valuepoints;
            this.rbcForDeletion.push(rm.elementNumber);
          }

          regex = /(?<rbcNo>.*) (?<pct>.*) PERCENT POINTS REDEMPTION/g;
          match = regex.exec(rm.freeFlowText);
          if (match) {
            model.pct = match.groups.pct;
            this.rbcForDeletion.push(rm.elementNumber);
          }
        }
      }
    }
    return rbcModels;
  }

  private getKelements(rm: any): string {
    this.rbcForDeletion.push(rm.elementNumber);
    return rm.freeFlowText.substr(rm.freeFlowText.indexOf('-') + 2, rm.freeFlowText.length);
  }

  processRIRRemark(label, amount, count) {
    if (isNaN(amount) || amount === null || amount === undefined || amount === '' || Number(amount) === 0) {
      amount = '0.00';
    }

    // alert(amount);
    if (amount === '0.00') {
      return null;
    }

    const r = 15;
    const l = 30;

    const amtStr = this.decPipe.transform(amount.toString().replace(',', ''), '1.2-2').replace(',', '');
    const z = l - (label.length + amtStr.length);
    let remark = '';

    if (count === null) {
      remark = label + '-'.repeat(z) + amtStr;
    } else {
      // const total = Math.round(Number(amount) * Number(count));
      const total = parseFloat(amount) * Number(count);
      const totalStr = this.decPipe.transform(total, '1.2-2');
      // console.log('Amount ' + parseFloat(amount));
      // console.log('total ' + total);
      const x = r - (count.toString().length + totalStr.length);
      remark = label + '-'.repeat(z) + amtStr + 'X' + count + '-'.repeat(x) + totalStr;
    }

    return this.remarkHelper.createRemark(remark, 'RI', 'R');
  }
}
