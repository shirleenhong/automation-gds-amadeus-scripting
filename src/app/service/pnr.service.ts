import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CfRemarkModel } from '../models/pnr/cf-remark.model';
import { MatrixAccountingModel } from '../models/pnr/matrix-accounting.model';
import { MatrixReceiptModel } from '../models/pnr/matrix-receipt.model';
import { AmountPipe } from '../pipes/amount.pipe';
import { PassiveSegmentsModel } from '../models/pnr/passive-segments.model';
import { LeisureFeeModel } from '../models/pnr/leisure-fee.model';

declare var PNR: any;
declare var smartScriptSession: any;

@Injectable({
  providedIn: 'root'
})
export class PnrService {
  pnrObj: any;
  isPNRLoaded = false;
  errorMessage = '';
  destinationCity = [{ endpoint: '', startpoint: '' }];
  cfLine: CfRemarkModel;
  segments = [];
  amountPipe = new AmountPipe();
  PCC = '';
  // recordLocator = '';

  constructor() { }

  async getPNR(): Promise<void> {
    this.cfLine = null;
    this.pnrObj = new PNR();
    await this.pnrObj
      .retrievePNR()
      .then(
        () => {
          this.isPNRLoaded = true;
          this.errorMessage = 'PNR Loaded Successfully';
        },
        (error: string) => {
          this.isPNRLoaded = false;
          this.errorMessage = 'Error: ' + error;
        }
      )
      .catch((err) => {
        console.log(err);
      });
    this.getPCC();
    this.getRecordLocator();
    console.log(JSON.stringify(this.pnrObj));
  }

  getPCC(): void {
    smartScriptSession.requestService('usermanagement.retrieveUser').then((x) => {
      this.PCC = x.ACTIVE_OFFICE_ID;
    });
  }

  getRecordLocator(): void {
    smartScriptSession.getRecordLocator().then((x) => {
      this.recordLocator = x;
    });
  }

  getRemarkLineNumber(searchText: string) {
    if (this.isPNRLoaded) {
      for (const rm of this.pnrObj.rmElements) {
        if (rm.freeFlowText.indexOf(searchText) === 0) {
          return rm.elementNumber;
        }
      }
    }
    return '';
  }

  getRemarkLineNumbers(searchText: string) {
    const lineNos: Array<string> = [];
    if (this.isPNRLoaded) {
      for (const rm of this.pnrObj.rmElements) {
        if (rm.freeFlowText.indexOf(searchText) === 0) {
          lineNos.push(rm.elementNumber);
        }
      }
    }
    return lineNos;
  }

  getRemarkText(searchText: string) {
    if (this.isPNRLoaded) {
      for (const rm of this.pnrObj.rmElements) {
        if (rm.freeFlowText.indexOf(searchText) === 0) {
          return rm.freeFlowText;
        }
      }
    }
    return '';
  }

  getItineraryLanguage(): string {
    if (this.isPNRLoaded) {
      for (const rm of this.pnrObj.rmElements) {
        if (rm.freeFlowText.indexOf('LANGUAGE-') === 0) {
          return rm.freeFlowText.substr(9); // returns e.g. EN-GB, FR-FR
        }
      }
    }
    return '';
  }

  getCFLine(): CfRemarkModel {
    if (this.cfLine === undefined || this.cfLine === null) {
      const cfLine = new CfRemarkModel();
      if (this.isPNRLoaded) {
        for (const rm of this.pnrObj.rmElements) {
          if (rm.freeFlowText.indexOf('CF/-') === 0) {
            cfLine.lastLetter = rm.freeFlowText.substr(-1);
            cfLine.cfa = rm.freeFlowText.substr(4, 3);
            cfLine.code = rm.freeFlowText;
            return cfLine;
          }
        }
      } else {
        return this.cfLine;
      }
    }
    return null;
  }

  getFSRemark() {
    if (this.isPNRLoaded) {
      for (const rm of this.pnrObj.fsElements) {
        return rm.fullNode.otherDataFreetext.longFreetext;
      }
    }
    return '';
  }

  getFSLineNumber() {
    if (this.isPNRLoaded) {
      for (const rm of this.pnrObj.fsElements) {
        return rm.elementNumber;
      }
    }
    return '';
  }

  getRIRLineNumber(searchText: string) {
    if (this.isPNRLoaded) {
      for (const rii of this.pnrObj.rirElements) {
        const text = rii.fullNode.extendedRemark.structuredRemark.freetext;
        if (text.indexOf(searchText) === 0) {
          return rii.elementNumber;
        }
      }
    }
    return '';
  }

  getRIRLineNumbers(searchText: string) {
    const lines = [];
    if (this.isPNRLoaded) {
      for (const rii of this.pnrObj.rirElements) {
        const text = rii.fullNode.extendedRemark.structuredRemark.freetext;
        if (text.indexOf(searchText) === 0) {
          lines.push(rii.elementNumber);
        }
      }
    }
    return lines;
  }

  getPassengers() {
    if (this.isPNRLoaded) {
      const passengers = [];

      for (const rm of this.pnrObj.nameElements) {
        const fname = rm.firstName;
        const lname = rm.lastName;

        const fullname: any =
          lname +
          '-' +
          fname
            .toUpperCase()
            .replace(' MS', '')
            .replace(' MRS', '')
            .replace(' MSTR', '')
            .replace(' INF', '')
            .replace(' MR', '')
            .replace(' MISS', '');

        const passenger = {
          firstname: fname,
          surname: lname,
          id: rm.elementNumber,
          tatooNo: rm.tatooNumber,
          fullname
        };
        passengers.push(passenger);
      }
      return passengers;
    }
    return new Array<string>();
  }

  pushDestination(endpoint, startpoint?) {
    const look = this.destinationCity.find((x) => x.endpoint === endpoint);
    if (look == null) {
      const destination = {
        endpoint,
        startpoint
      };
      this.destinationCity.push(destination);
    }
  }

  getPnrDestinations() {
    if (this.isPNRLoaded) {
      for (const air of this.pnrObj.airSegments) {
        const airendpoint = air.arrivalAirport;
        this.pushDestination(airendpoint);
      }
      for (const car of this.pnrObj.auxCarSegments) {
        const carendpoint = car.fullNode.travelProduct.boardpointDetail.cityCode;
        this.pushDestination(carendpoint);
      }

      for (const hotel of this.pnrObj.auxHotelSegments) {
        const hotelendpoint = hotel.fullNode.travelProduct.boardpointDetail.cityCode;
        this.pushDestination(hotelendpoint);
      }

      for (const misc of this.pnrObj.miscSegments) {
        const miscendpoint = misc.fullNode.travelProduct.boardpointDetail.cityCode;
        this.pushDestination(miscendpoint);
      }
      return this.destinationCity;
    }
  }

  getPnrSegments() {
    if (this.isPNRLoaded) {
    }
    return '';
  }

  getPassiveCarSegmentNumbers() {
    return this.getPassiveSegmentTypes('CAR');
  }

  getPassiveSegmentTypes(segmentType: string) {
    const elements = new Array<any>();

    this.getSegmentTatooNumber().forEach((c) => {
      if (c.segmentType === segmentType) {
        elements.push(c);
      }
    });

    return elements;
  }

  getPassiveHotelSegmentNumbers() {
    return this.getPassiveSegmentTypes('HTL');
  }

  getPassiveAirSegments(lineNo: any) {
    const elements = new Array<any>();

    this.getSegmentTatooNumber().forEach((c) => {
      if (lineNo === '') {
        if (c.segmentType === 'AIR') {
          elements.push({
            airlineCode: c.airlineCode,
            lineNo: c.lineNo,
            freeText: c.longFreeText.toUpperCase()
          });
        }
      } else {
        if (c.segmentType === 'AIR' && c.lineNo === lineNo) {
          elements.push({
            airlineCode: c.airlineCode,
            lineNo: c.lineNo,
            freeText: c.longFreeText.toUpperCase()
          });
        }
      }
    });

    return elements;
  }

  getPassiveAirSegmentNumbers() {
    const elementNumbers = new Array<number>();
    for (const rm of this.pnrObj.airSegments) {
      elementNumbers.push(rm.elementNumber);
    }
    return elementNumbers;
  }

  getSegmentTatooNumber() {
    // const segments = new Array<any>();
    this.segments = [];
    for (const air of this.pnrObj.airSegments) {
      this.getSegmentDetails(air, 'AIR');
    }

    for (const car of this.pnrObj.auxCarSegments) {
      this.getSegmentDetails(car, 'CAR');
    }

    for (const hotel of this.pnrObj.auxHotelSegments) {
      this.getSegmentDetails(hotel, 'HTL');
    }

    for (const misc of this.pnrObj.miscSegments) {
      if (
        misc.fullNode.itineraryFreetext.longFreetext.indexOf('THANK YOU FOR CHOOSING CARLSON') === -1 &&
        misc.fullNode.itineraryFreetext.longFreetext.indexOf('PNR CANCELLED') === -1 &&
        misc.fullNode.itineraryFreetext.longFreetext.indexOf('CWT RETENTION SEGMENT') === -1
      ) {
        this.getSegmentDetails(misc, 'MIS');
      }
    }
    return this.segments;
  }

  private formatDate(tempDate) {
    const lairdate = new Date(tempDate.substr(2, 2) + '/' + tempDate.substr(0, 2) + '/' + tempDate.substr(4, 2));
    const datePipe = new DatePipe('en-US');
    const tdate = datePipe.transform(lairdate, 'ddMMM');
    return tdate;
  }

  private getSegmentDetails(elem: any, type: string) {
    let elemText = '';
    let elemStatus = '';
    let elemairlineCode = '';
    let elemdepdate = '';
    let elemcitycode = '';
    let flightNumber = '';
    let arrivalAirport = '';
    let departureTime = '';
    let departureDate = '';
    let arrivalTime = '';
    let arrivalDate = '';
    let classservice = '';
    let flongtext = '';
    let controlNumber = '';

    if (type === 'AIR') {
      elemText =
        elem.airlineCode +
        elem.flightNumber +
        ' ' +
        elem.class +
        this.formatDate(elem.departureDate) +
        ' ' +
        elem.departureAirport +
        elem.arrivalAirport +
        ' ' +
        elem.status +
        elem.bookedQuantity +
        ' ' +
        elem.departureTime +
        ' ' +
        elem.arrivalTime +
        ' ' +
        this.formatDate(elem.arrivalDate) +
        ' ' +
        elem.airlineReference;
      elemStatus = elem.status;
      elemairlineCode = elem.airlineCode;
      elemdepdate = elem.departureDate;
      elemcitycode = elem.departureAirport;
      flightNumber = elem.flightNumber;
      arrivalAirport = elem.arrivalAirport;
      departureTime = elem.departureTime;
      departureDate = elem.departureDate;
      arrivalTime = elem.arrivalTime;
      arrivalDate = elem.arrivalDate;
      classservice = elem.class;
      controlNumber = elem.airlineReference;
    } else {
      const fullnodetemp = elem.fullNode.travelProduct;
      elemText =
        type +
        ' ' +
        fullnodetemp.companyDetail.identification +
        ' ' +
        elem.fullNode.relatedProduct.status +
        elem.fullNode.relatedProduct.quantity +
        ' ' +
        fullnodetemp.boardpointDetail.cityCode +
        ' ' +
        this.formatDate(fullnodetemp.product.depDate);
      elemStatus = elem.fullNode.relatedProduct.status;
      elemdepdate = fullnodetemp.product.depDate;
      arrivalDate = fullnodetemp.product.arrDate;
      elemcitycode = fullnodetemp.boardpointDetail.cityCode;
      flongtext = elem.fullNode.itineraryFreetext.longFreetext;
    }

    const segment = {
      lineNo: elem.elementNumber,
      tatooNo: elem.tatooNumber,
      status: elemStatus,
      segmentType: type,
      longFreeText: elemText,
      airlineCode: elemairlineCode,
      freetext: flongtext,
      deptdate: elemdepdate,
      cityCode: elemcitycode,
      arrivalStation: arrivalAirport,
      flightNumber,
      arrivalAirport,
      departureTime,
      departureDate,
      arrivalTime,
      arrivalDate,
      classservice,
      controlNumber
    };
    this.segments.push(segment);
  }

  private getLastDate(airdate: any, lastDeptDate: Date) {
    const lairdate = new Date(airdate.substr(2, 2) + '/' + airdate.substr(0, 2) + '/' + airdate.substr(4, 2));
    if (lairdate > lastDeptDate) {
    }
    {
      lastDeptDate = lairdate;
    }
    return lastDeptDate;
  }

  checkTST(): boolean {
    if (this.pnrObj.fullNode.response.model.output.response.tstData !== undefined) {
      return true;
    } else {
      return false;
    }
  }

  getLatestDepartureDate() {
    let lastDeptDate = new Date();
    for (const air of this.pnrObj.airSegments) {
      const airdate = air.fullNode.travelProduct.product.depDate;
      lastDeptDate = this.getLastDate(airdate, lastDeptDate);
    }

    for (const car of this.pnrObj.auxCarSegments) {
      const cardate = car.fullNode.travelProduct.product.depDate;
      lastDeptDate = this.getLastDate(cardate, lastDeptDate);
    }

    for (const hotel of this.pnrObj.auxHotelSegments) {
      const hotdate = hotel.fullNode.travelProduct.product.depDate;
      lastDeptDate = this.getLastDate(hotdate, lastDeptDate);
    }

    for (const misc of this.pnrObj.miscSegments) {
      const miscdate = misc.fullNode.travelProduct.product.depDate;
      lastDeptDate = this.getLastDate(miscdate, lastDeptDate);
    }
    return lastDeptDate;
  }

  getRemarksFromGDS() {
    const remarks = new Array<any>();
    if (this.isPNRLoaded) {
      for (const rm of this.pnrObj.rmElements) {
        const rem = {
          remarkText: rm.fullNode.miscellaneousRemarks.remarks.freetext,
          category: rm.fullNode.miscellaneousRemarks.remarks.type,
          lineNo: rm.elementNumber
        };
        remarks.push(rem);
      }
    }
    return remarks;
  }

  getAllUdidRemarks() {
    return this.getRemarksFromGDSByRegex(/U[0-9]{1,2}\/-(?<value>(.*))/g);
  }

  getRemarksFromGDSByRegex(regex, category?) {
    const remarks = new Array<any>();
    if (this.isPNRLoaded) {
      let arr = [];
      switch (category) {
        case 'RIR':
          arr = this.pnrObj.rirElements;
          break;
        default:
          arr = this.pnrObj.rmElements;
          break;
      }

      for (const rm of arr) {
        const rem = {
          remarkText: rm.fullNode.miscellaneousRemarks.remarks.freetext,
          category: rm.fullNode.miscellaneousRemarks.remarks.type,
          lineNo: rm.elementNumber,
          tattooNumber: rm.tatooNumber,
          value: '',
          segments: [],
          qualifier: rm.category
        };

        // if (rm.associations !== undefined && rm.associations && rm.associations.length > 0) {
        if (rm.associations) {
          rm.associations.forEach((element) => {
            rem.segments.push(element.tatooNumber);
          });
        }
        const match = regex.exec(rem.remarkText);
        regex.lastIndex = 0;
        if (match !== null) {
          if (match.groups !== undefined && match.groups.value !== undefined) {
            rem.value = match.groups.value;
          }
          remarks.push(rem);
        }
      }
    }
    return remarks;
  }

  getRirRemarksFromGDS() {
    const remarks = new Array<any>();
    if (this.isPNRLoaded) {
      for (const ri of this.pnrObj.rirElements) {
        const rem = {
          remarkText: ri.fullNode.miscellaneousRemarks.remarks.freetext,
          category: ri.fullNode.miscellaneousRemarks.remarks.type,
          lineNo: ri.elementNumber
        };
        remarks.push(rem);
      }
    }
    return remarks;
  }

  getRirRemarkText(searchText: string) {
    if (this.isPNRLoaded) {
      for (const ri of this.pnrObj.rirElements) {
        const text = ri.fullNode.miscellaneousRemarks.remarks.freetext;
        if (text.indexOf(searchText) === 0) {
          return ri;
        }
      }
    }
    return '';
  }

  getUDIDText(searchText: string) {
    if (this.isPNRLoaded) {
      for (const ri of this.pnrObj.rmElements) {
        if (ri.fullNode.miscellaneousRemarks.remarks.freetext.indexOf(searchText) === 0) {
          // return ri.fullNode.miscellaneousRemarks.remarks.freetext;
          return ri;
        }
      }
    }
    return '';
  }

  getMatrixReceiptLineNumbers() {
    return this.getRemarkLineNumbers('REC/-RLN');
  }

  getMatrixAccountingLineNumbers() {
    return this.getRemarkLineNumbers('MAC/-');
  }

  getSFCRemarks(): Array<LeisureFeeModel> {
    const fees = new Array<LeisureFeeModel>();
    let taxProvince = this.getRemarkText('TAX-');

    if (taxProvince !== '') {
      taxProvince = taxProvince.substr(taxProvince.indexOf('-') + 1);
    }

    for (const rm of this.pnrObj.rmElements) {
      if (rm.freeFlowText.indexOf('SFC/-') === 0) {
        const fee = new LeisureFeeModel();
        const rems = rm.freeFlowText.split('/-');
        fee.segmentAssoc = '2';
        fee.address = taxProvince;
        fee.passengerNo = this.getPassengerAssocNumbers(rm.associations);
        rems.forEach((r) => {
          if (r.indexOf('-') >= 0) {
            const arr = r.split('-');
            switch (arr[0]) {
              case 'FA':
                const type = arr[1].substr(0, 1);
                switch (type) {
                  case 'C':
                    fee.segmentAssoc = '4';
                    break;
                  case 'H':
                    fee.segmentAssoc = '3';
                    break;
                  case 'T':
                    fee.segmentAssoc = '1';
                    break;
                }
                fee.segmentNum = arr[1].replace(type, '');
                break;
              case 'FLN':
                fee.fln = arr[1].replace('F', '');
                break;
              case 'AMT':
                fee.amount = arr[1].replace('CAD', '');
                break;
              case 'FOP':
                if (arr[1] === 'CK') {
                  fee.paymentType = 'K';
                } else {
                  fee.paymentType = 'C';
                  fee.vendorCode = arr[1].substr(2, 2);
                  fee.ccNo = arr[1].substr(4);
                }
                break;
              case 'EXP':
                fee.expDate = arr[1].substr(0, 2) + '/' + arr[1].substr(2, 2);
                break;
            }
          }
        });
        fees.push(fee);
      }
    }

    return fees;
  }

  getAccountingRemarks(): Array<MatrixAccountingModel> {
    const matrixModels = new Array<MatrixAccountingModel>();
    const apays = this.getApayRirRemarkLines();
    let macNum = '';

    for (const rm of this.pnrObj.rmElements) {
      if (rm.freeFlowText.indexOf('MAC/-') === 0) {
        let model: MatrixAccountingModel;
        macNum = rm.freeFlowText.match(/LK-MAC[0-9]*/g);
        if (macNum !== undefined && macNum !== '') {
          macNum = macNum.toString().replace('LK-MAC', '');
          model = matrixModels.find((x) => x.tkMacLine === Number(macNum));
        }

        if (model === null || model === undefined) {
          model = new MatrixAccountingModel();
          matrixModels.push(this.extractMatrixAccount(model, rm.freeFlowText));
        } else {
          this.extractMatrixAccount(model, rm.freeFlowText);
        }
        if (model.bsp === undefined || model.bsp == null || model.bsp === '') {
          model.bsp = '1';
        } // default
        if (rm.associations !== null && rm.associations !== undefined && model !== undefined) {
          model.segmentNo = this.getAssocNumbers(rm.associations);
          model.passengerNo = this.getPassengerAssocNumbers(rm.associations);
          model.passRelate = false;
          if (model.passengerNo) {
            model.passRelate = true;
          }
          if (model.supplierCodeName === 'ACJ') {
            model = this.extractCanadaPass(model, rm.associations);
          }

          if (apays !== null && apays.length > 0) {
            apays.forEach((x) => {
              if (x.segments === model.segmentNo) {
                model.bsp = '2';
                model.descriptionapay = x.remark
                  .match(/PAID (.*) CF-/g)
                  .toString()
                  .replace('CF-', '')
                  .replace('PAID ', '')
                  .trim();
                model.accountingTypeRemark = '0';
              }
            });
          }
        }

        if (model.supplierCodeName === 'MLF') {
          model.accountingTypeRemark = 'INS';
          model.bsp = '3';
        }
      }
    }
    return matrixModels;
  }
  extractCanadaPass(model: MatrixAccountingModel, assoc) {
    debugger;
    let pass = this.getRemarksFromGDSByRegex(/(.*) PASS REDEMPTION-(.*) FARE/g, 'RIR');
    let found = false;
    if (pass.length > 0) {
      pass.forEach((x) => {
        const list = assoc.filter((s) => x.segments.indexOf(s.tatooNumber) >= 0);
        if (!found && list.length === x.segments.length) {
          const text = x.remarkText;
          const vals = text.split(' PASS REDEMPTION-');
          model.passPurchase = vals[0].trim();
          model.fareType = vals[1].replace('FARE', '').trim();
          model.accountingTypeRemark = 'ACPR';
          found = true;
        }
      });
      return model;
    }
    found = false;
    pass = this.getRemarksFromGDSByRegex(/(.*) PASS-(.*) FARE/g, 'RIR');
    if (pass.length > 0) {
      pass.forEach((x) => {
        const list = assoc.filter((s) => x.segments.indexOf(s.tatooNumber) >= 0);
        if (!found && list.length === x.segments.length) {
          const text = x.remarkText;
          const vals = text.split(' PASS-');
          model.passPurchase = vals[0].trim();
          model.fareType = vals[1].replace('FARE', '').trim();
          model.accountingTypeRemark = 'ACPP';
          const air = this.getSegmentTatooNumber().find((x) => x.segmentType === 'AIR' && x.controlNumber === model.supplierConfirmatioNo);
          if (air) {
            model.departureCity = air.cityCode;
          }
          found = true;
        }
      });
      return model;
    }

    return model;
  }

  private extractMatrixAccount(model: MatrixAccountingModel, remark: string): MatrixAccountingModel {
    const rem = remark.split('/-');

    rem.forEach((r) => {
      const val = r.split('-');
      switch (val[0]) {
        case 'SUP':
          model.supplierCodeName = val[1];

          break;
        case 'LK':
          model.tkMacLine = Number(val[1].replace('MAC', ''));
          break;
        case 'AMT':
          model.baseAmount = this.amountPipe.transform(val[1]);
          break;
        case 'PT':
          const pt = val[1]
            .replace('XG', '')
            .replace('XQ', '')
            .replace('XT', '');
          if (model.hst == null) {
            model.hst = this.amountPipe.transform(parseFloat(pt));
          } else if (model.gst == null) {
            model.gst = this.amountPipe.transform(parseFloat(pt));
          } else if (model.qst == null) {
            model.qst = this.amountPipe.transform(parseFloat(pt));
          } else if (model.otherTax == null) {
            model.otherTax = this.amountPipe.transform(parseFloat(pt));
          }
          break;
        case 'FOP':
          model.fop = val[1].substr(0, 2);
          if (model.fop === 'CC' || model.fop === 'AP') {
            model.vendorCode = val[1].substr(2, 2);
            model.cardNumber = val[1].substr(4);
          }

          break;
        case 'EXP':
          model.expDate = val[1].substr(0, 2) + '/' + val[1].substr(2, 2);
          break;
        case 'TK':
          model.tktLine = val[1];
          break;
        case 'MP':
          model.passengerNo = val[1];
          break;
        case 'BKN':
          model.supplierConfirmatioNo = val[1].replace('CWT', '');
          break;
        case 'CD':
          model.commisionWithoutTax = val[1];
          break;
        case 'CP':
          model.commisionPercentage = val[1];
          break;
        case '':
      }
    });

    return model;
  }

  getAssocNumbers(assoc) {
    if (assoc === null || assoc === undefined) {
      return '';
    }
    const s = [];
    assoc.forEach((x) => {
      const segment = this.getSegmentTatooNumber().find((z) => z.tatooNo === x.tatooNumber && x.segmentType === 'ST');
      if (segment !== null && segment !== undefined) {
        s.push(segment.lineNo);
      }
    });
    return s.join(',');
  }

  getPassengerAssocNumbers(assoc) {
    if (assoc === null || assoc === undefined) {
      return '';
    }
    const s = [];
    assoc.forEach((x) => {
      const passenger = this.getPassengers().find((z) => z.tatooNo === x.tatooNumber && x.segmentType === 'PT');
      if (passenger !== null && passenger !== undefined) {
        s.push(passenger.id);
      }
    });
    return s.join(',');
  }

  getApayRirRemarkLines() {
    const apays = [];
    if (this.isPNRLoaded) {
      for (const rm of this.pnrObj.rirElements) {
        const rem = rm.fullNode.miscellaneousRemarks.remarks.freetext;
        if (rem.match(/PAID (.*) CF-(.*) PLUS (.*) TAX ON (.*)/g) !== null) {
          apays.push({
            lineNum: rm.elementNumber,
            remark: rem,
            segments: this.getAssocNumbers(rm.associations)
          });
        }
      }
    }
    return apays;
  }

  hasNUCRemarks() {
    if (this.isPNRLoaded) {
      for (const rm of this.pnrObj.rmElements) {
        if (rm.freeFlowText === 'NUC') {
          return rm.elementNumber;
        }
      }
    }
    return '0';
  }

  hasHotelCancelSegments() {
    if (this.isPNRLoaded) {
      for (const rm of this.pnrObj.rmElements) {
        if (rm.freeFlowText === '/HTL SEGMENT INCLUDED IN CANCEL') {
          return true;
        }
      }
    }
    return false;
  }

  getMatrixReceiptRemarks(): MatrixReceiptModel[] {
    const matrixReceipts: MatrixReceiptModel[] = [];
    for (const rm of this.pnrObj.rmElements) {
      if (rm.freeFlowText.indexOf('REC/-') === 0) {
        let model: MatrixReceiptModel;
        let rln = rm.freeFlowText.match(/REC\/-RLN-[0-9]*/g);
        if (rln !== undefined && rln !== '') {
          rln = rln.toString().replace('REC/-RLN-', '');
          model = matrixReceipts.find((x) => x.rln === Number(rln));
        }
        if (model === null || model === undefined) {
          model = new MatrixReceiptModel();

          matrixReceipts.push(this.extractMatrixReceipt(model, rm.freeFlowText));
        } else {
          this.extractMatrixReceipt(model, rm.freeFlowText);
        }
      }
    }

    return matrixReceipts;
  }

  getSegmentModel(freetext, index, type) {
    let segmentModel: PassiveSegmentsModel;
    segmentModel = new PassiveSegmentsModel();

    if (type === 'MIS' || type === 'CAR' || type === 'HTL') {
      // tslint:disable-next-line:max-line-length
      let regex = /TYP-(?<type>(.*))\/SUN-((?<vendorName>(.*)))\/SUC-(?<vendorCode>(.*))\/SC-(?<depCity>(.*))\/SD-(?<depdate>(.*))\/ST-(?<dateTime>(.*))\/EC-(?<destcity>(.*))\/ED-(?<arrdate>(.*))\/ET-(?<arrtime>(.*))\/CF-(?<conf>(.*))/g;
      let match = regex.exec(freetext);
      if (match === null) {
        regex = /TYP-(?<type>(.*))\/SUN-((?<vendorName>(.*)))\/SUC-(?<vendorCode>(.*))\/SC-(?<depCity>(.*))\/SD-(?<depdate>(.*))\/ST-(?<dateTime>(([0-9]{4})))(?<destcity>(.*))\/ED-(?<arrdate>(.*))\/ET-(?<arrtime>(.*))\/CF-(?<conf>(.*))/g;
        match = regex.exec(freetext);
      }
      if (match === null) {
        regex = /TYP-(?<type>(.*))\/SUN-((?<vendorName>(.*)))\/SUC-(?<vendorCode>(.*))\/STP-(?<depCity>(.*))\/SD-(?<depdate>(.*))\/ST-(?<dateTime>(.*))\/EC-(?<destcity>(.*))\/ED-(?<arrdate>(.*))\/ET-(?<arrtime>(.*))\/CF-(?<conf>(.*))/g;
        match = regex.exec(freetext);
      }
      if (match === null) {
        regex = /SUC-(?<vendorCode>(.*))\/SUN-(?<vendorName>(.*))\/SD-(?<depdate>(.*))\/ST-(?<dateTime>(.*))\/ED-(?<arrdate>(.*))\/ET-(?<arrtime>(.*))\/TTL-(?<carCost>(.*))\/CF-(?<conf>(.*))/g;
        match = regex.exec(freetext);
      }

      if (match !== null) {
        segmentModel.isNew = false;
        segmentModel.segmentNo = index;
        segmentModel.segmentType = match.groups.type;
        if (!match.groups.type) {
          segmentModel.segmentType = type;
        }
        segmentModel.vendorName = match.groups.vendorName;
        segmentModel.vendorCode = match.groups.vendorCode;
        segmentModel.departureCity = match.groups.depCity;
        segmentModel.departureDate = match.groups.depdate;
        segmentModel.departureTime = match.groups.dateTime;
        segmentModel.destinationCity = match.groups.destcity;
        segmentModel.arrivalDate = match.groups.arrdate;
        segmentModel.arrivalTime = match.groups.arrtime;
        segmentModel.confirmationNo = match.groups.conf;
      } else if (type === 'HTL') {
        segmentModel.segmentType = type;
      }
      return segmentModel;
    }
  }

  getAirSegmentModel(element, index) {
    let segmentModel: PassiveSegmentsModel;
    segmentModel = new PassiveSegmentsModel();
    segmentModel.isNew = false;
    segmentModel.segmentNo = index;
    segmentModel.segmentType = element.segmentType;
    segmentModel.flightNumber = element.flightNumber;
    segmentModel.classService = element.classservice;
    segmentModel.departureDate = this.formatDate(element.departureDate);
    segmentModel.departureTime = element.departureTime;
    segmentModel.departureCity = element.cityCode;
    segmentModel.destinationCity = element.arrivalStation;
    segmentModel.arrivalDate = this.formatDate(element.arrivalDate);
    segmentModel.arrivalTime = element.arrivalTime;
    segmentModel.airlineCode = element.airlineCode;
    return segmentModel;
  }

  getHotelSegmentModel(element, index, freetext) {
    let segmentModel: PassiveSegmentsModel;
    segmentModel = new PassiveSegmentsModel();
    segmentModel.isNew = false;
    segmentModel.segmentNo = index;
    segmentModel.segmentType = element.segmentType;
    segmentModel.departureDate = this.formatDate(element.deptdate);
    segmentModel.departureCity = element.cityCode;
    segmentModel.destinationCity = element.arrivalStation;
    segmentModel.arrivalDate = this.formatDate(element.arrivalDate);

    const regex = /(?<hotelInfo>(.*)),CF:(?<confirmationNumber>(.*?),)/g;
    const match = regex.exec(freetext);

    if (match) {
      segmentModel.confirmationNo = match.groups.confirmationNumber.substr(0, match.groups.confirmationNumber.length - 1);
    }

    return segmentModel;
  }

  getModelPassiveSegments(): PassiveSegmentsModel[] {
    const pSegment: PassiveSegmentsModel[] = [];
    const segment = this.getSegmentTatooNumber();
    let index = 0;
    segment.forEach((element) => {
      index++;

      switch (element.segmentType) {
        case 'MIS':
        case 'CAR':
          pSegment.push(this.getSegmentModel(element.freetext, index, element.segmentType));
          break;
        case 'AIR':
          pSegment.push(this.getAirSegmentModel(element, index));
          break;
        case 'HTL':
          pSegment.push(this.getHotelSegmentModel(element, index, element.freetext));
          break;
      }
    });
    return pSegment;
  }

  // getRirSeaSegments() {
  //   const pSegment = [];
  //   let segment = this.getSegmentTatooNumber();
  //   segment.forEach(element => {
  //     pSegment.push();
  //   });
  //   return pSegment;
  // }

  private extractMatrixReceipt(model: MatrixReceiptModel, remark: string): MatrixReceiptModel {
    let regex = /RLN-(?<rln>[0-9]*)\/-RF-(?<fullname>(.*))\/-AMT-(?<amount>(.*))/g;
    let match = regex.exec(remark);
    if (match !== null) {
      model.rln = Number(match.groups.rln);
      model.passengerName = match.groups.fullname;
      model.amount = this.amountPipe.transform(match.groups.amount);
      return model;
    }
    regex = /RLN-(?<rln>[0-9]*)\/-PR(?<lastFourDigit>(.*))\/-BA-(?<bankAccount>(.*))\/-GL-(?<gl>(.*))/g;
    match = regex.exec(remark);
    if (match !== null) {
      model.rln = Number(match.groups.rln);
      model.glCode = match.groups.gl;
      model.lastFourVi = match.groups.lastFourDigit;
      model.bankAccount = match.groups.bankAccount;
      return model;
    }
    regex = /RLN-(?<rln>[0-9]*)\/-RM-POINTS (?<points>(.*)) REF-(?<ref>(.*))/g;
    match = regex.exec(remark);
    if (match !== null) {
      model.rln = Number(match.groups.rln);
      model.points = match.groups.points;
      model.cwtRef = match.groups.ref;
      return model;
    }
    regex = /RLN-(?<rln>[0-9]*)\/-FOP-(?<fop>(.*))\/-LK-T\/-BA-(?<ba>(.*))\/-GL-(?<glcode>(.*))/g;
    match = regex.exec(remark);
    if (match !== null) {
      model.rln = Number(match.groups.rln);
      model.bankAccount = match.groups.ba;
      model.glCode = match.groups.glcode;
      const fop = match.groups.fop;
      const typ = fop.substr(0, 2);
      model.modePayment = typ;
      if (typ === 'CC') {
        regex = /([A-Z]{2})(?<vendor>[A-Z]{2})(?<cardNo>[0-9]*)\/-EXP-(?<exp>([0-9]{4}))/g;
        match = regex.exec(fop);
        if (match !== null) {
          model.vendorCode = match.groups.vendor;
          model.ccNo = Number(match.groups.cardNo);
          model.expDate = match.groups.exp.substr(0, 2) + '/' + match.groups.exp.substr(2, 2);
        }

        return model;
      }
    }
    regex = /RLN-(?<rln>[0-9]*)\/-RM-(?<desc>([^\/]+))(\/-GC-(?<gc>.*))?/g;
    match = regex.exec(remark);
    if (match !== null) {
      model.rln = Number(match.groups.rln);
      model.description = match.groups.desc;
      if (model.gcNumber !== null) {
        model.gcNumber = match.groups.gc;
      }
      return model;
    }

    return model;
  }

  recordLocator() {
    return this.pnrObj.header.recordLocator;
  }

  hasAmendMISRetentionLine() {
    for (const misc of this.pnrObj.miscSegments) {
      if (misc.fullNode.itineraryFreetext.longFreetext.indexOf('THANK YOU FOR CHOOSING CARLSON') > -1) {
        return true;
      }
    }

    return false;
  }

  getMISRetentionLineNumber(freetext) {
    for (const misc of this.pnrObj.miscSegments) {
      if (misc.fullNode.itineraryFreetext.longFreetext.indexOf(freetext) > -1) {
        return misc.elementNumber;
      }
    }
    return '';
  }

  IsExistAmkVib(supCode) {
    if (this.isPNRLoaded) {
      for (const misc of this.pnrObj.miscSegments) {
        if (supCode === 'vib') {
          if (
            misc.fullNode.itineraryFreetext.longFreetext.indexOf('FOR VIA RAIL TRAVEL PLEASE CHECK IN AT TRAIN STATION') > -1 ||
            misc.fullNode.itineraryFreetext.longFreetext.indexOf('POUR LES DEPLACEMENTS A BORD DE VIA RAIL VEUILLEZ VOUS') > -1
          ) {
            return true;
          }
        }
        if (supCode === 'amk') {
          if (
            misc.fullNode.itineraryFreetext.longFreetext.indexOf('VALID IDENTIFICATION IS REQUIRED FOR ALL PASSENGERS 18 AND OVER') > -1
          ) {
            return true;
          }
        }
      }
    }

    return false;
  }

  getEmailAddressesFromGds() {
    const emailList = [];
    if (this.isPNRLoaded) {
      for (const ape of this.pnrObj.apElements) {
        if (ape.type === 'E') {
          emailList.push(ape.fullNode.otherDataFreetext.longFreetext);
        }
      }
    }
    return emailList;
  }

  getRmqEmail() {
    if (this.isPNRLoaded) {
      for (const rm of this.pnrObj.rmElements) {
        if (rm.category === 'Q' && rm.freeFlowText === 'EMAIL ADD-NO') {
          return true;
        }
      }
    }
    return false;
  }

  getmisCancel() {
    for (const misc of this.pnrObj.miscSegments) {
      if (misc.fullNode.itineraryFreetext.longFreetext.indexOf('PNR CANCELLED') > -1) {
        // this.getSegmentDetails(misc, 'MIS');
        return misc.elementNumber;
      }
    }
    return 0;
  }
}
