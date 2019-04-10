import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RemarkGroup } from '../models/pnr/remark.group.model';
import { RemarkModel } from '../models/pnr/remark.model';
import { CfRemarkModel } from '../models/pnr/cf-remark.model';
import { debug } from 'util';
import { MatrixAccountingModel } from '../models/pnr/matrix-accounting.model';

declare var PNR: any;

@Injectable({
  providedIn: 'root'
})
export class PnrService {
  pnrObj: any;
  isPNRLoaded = false;
  errorMessage = '';
  destinationCity = [{ endpoint: '' }];
  cfLine: CfRemarkModel;
  segments = [];

  constructor() { }

  async getPNR(): Promise<void> {
    this.cfLine = null;
    this.pnrObj = new PNR();
    await this.pnrObj.retrievePNR().then(
      (res: any) => {
        this.isPNRLoaded = true;
        this.errorMessage = 'PNR Loaded Successfully';
      },
      (error: string) => {
        this.isPNRLoaded = false;
        this.errorMessage = 'Error: ' + error;
      }
    ).catch(err => { console.log(err); });

    console.log(JSON.stringify(this.pnrObj));
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
    if (this.cfLine == null) {
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

  getFSLineNumber() {
    if (this.isPNRLoaded) {
      for (const rm of this.pnrObj.fsElements) {
        return rm.elementNumber;
      }
    }
    return '';
  }

  getRIILineNumber(searchText: string) {
    if (this.isPNRLoaded) {
      for (const rii of this.pnrObj.riiElements) {
        if (rii.fullNode.extendedRemark.structuredRemark.freetext.indexOf(searchText) === 0) {
          return rii.elementNumber;
        }
      }
    }
    return '';
  }

  getPassengers() {
    if (this.isPNRLoaded) {
      const passengers = [];

      for (const rm of this.pnrObj.nameElements) {
        const fname =
          rm.fullNode.enhancedPassengerData.enhancedTravellerInformation
            .otherPaxNamesDetails.givenName;
        const lname =
          rm.fullNode.enhancedPassengerData.enhancedTravellerInformation
            .otherPaxNamesDetails.surname;

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
          fullname
        };
        passengers.push(passenger);
      }
      return passengers;
    }
    return new Array<string>();
  }

  pushDestination(endpoint) {
    const look = this.destinationCity.find(x => x.endpoint === endpoint);
    if (look == null) {
      const destination = {
        endpoint
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
        const carendpoint =
          car.fullNode.travelProduct.boardpointDetail.cityCode;
        this.pushDestination(carendpoint);
      }

      for (const hotel of this.pnrObj.auxHotelSegments) {
        const hotelendpoint =
          hotel.fullNode.travelProduct.boardpointDetail.cityCode;
        this.pushDestination(hotelendpoint);
      }

      for (const misc of this.pnrObj.miscSegments) {
        const miscendpoint =
          misc.fullNode.travelProduct.boardpointDetail.cityCode;
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
    const elementNumbers = new Array<number>();
    for (const rm of this.pnrObj.auxCarSegments) {
      elementNumbers.push(rm.elementNumber);
    }
    return elementNumbers;
  }

  getPassiveHotelSegmentNumbers() {
    const elementNumbers = new Array<number>();
    for (const rm of this.pnrObj.auxHotelSegments) {
      elementNumbers.push(rm.elementNumber);
    }
    return elementNumbers;
  }


  getSegmentTatooNumber() {
    // const segments = new Array<any>();
    this.segments = [];
    for (const air of this.pnrObj.airSegments) {
      this.getSegmentDetails(air, 'air');
    }

    for (const car of this.pnrObj.auxCarSegments) {
      this.getSegmentDetails(car, 'car');
    }

    for (const hotel of this.pnrObj.auxHotelSegments) {
      this.getSegmentDetails(hotel, 'hotel');
    }

    for (const misc of this.pnrObj.miscSegments) {
      if (misc.fullNode.itineraryFreetext.longFreetext.indexOf('THANK YOU FOR CHOOSING CARLSON') === -1 &&
        misc.fullNode.itineraryFreetext.longFreetext.indexOf('PNR CANCELLED') === -1) {
        this.getSegmentDetails(misc, 'mis');
      }
    }
    return this.segments;
  }

  private getSegmentDetails(elem: any, type: string) {
    let elemText = '';
    let elemStatus = '';
    let elemairlineCode = '';

    if (type === 'air') {
      elemText = type + '-' + elem.airlineCode + elem.flightNumber + ' ' + elem.class + elem.departureDate + ' '
        + elem.departureAirport + elem.arrivalAirport + elem.status + ' ' + elem.departureTime + ' ' + elem.arrivalTime;
      elemStatus = elem.status;
      elemairlineCode = elem.airlineCode;
    } else {
      const fullnodetemp = elem.fullNode.travelProduct;
      elemText = type + '-' + fullnodetemp.companyDetail.identification + ' ' + elem.fullNode.relatedProduct.status
        + elem.fullNode.relatedProduct.quantity + ' ' + fullnodetemp.boardpointDetail.cityCode + ' ' + fullnodetemp.product.depDate;
      elemStatus = elem.fullNode.relatedProduct.status;
    }
    const segment = {
      lineNo: elem.elementNumber,
      tatooNo: elem.tatooNumber,
      status: elemStatus,
      segmentType: type,
      longFreeText: elemText,
      airlineCode: elemairlineCode
    };
    this.segments.push(segment);
  }

  private getLastDate(airdate: any, lastDeptDate: Date) {
    const lairdate = new Date(airdate.substr(2, 2) + '/' + airdate.substr(0, 2) + '/' + airdate.substr(4, 2));
    if (lairdate > lastDeptDate) { } {
      lastDeptDate = lairdate;
    }
    return lastDeptDate;
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


  getRIIRemarksFromGDS() {
    const remarks = new Array<any>();
    if (this.isPNRLoaded) {
      for (const ri of this.pnrObj.riiElements) {
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

  getRIIRemarkText(searchText: string) {
    if (this.isPNRLoaded) {
      for (const ri of this.pnrObj.riiElements) {
        if (ri.fullNode.miscellaneousRemarks.remarks.freetext.indexOf(searchText) === 0) {
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
          //return ri.fullNode.miscellaneousRemarks.remarks.freetext;
          return ri;
        }
      }
    }
    return '';
  }



  getMatrixAccountingLineNumbers() {
    const lineNumbers = [];
    for (const rm of this.pnrObj.rmElements) {
      if (rm.freeFlowText.indexOf('MAC/-') === 0) {
        lineNumbers.push(rm.elementNumber);
      }
    }
    return lineNumbers;
  }


  getAccountingRemarks(): Array<MatrixAccountingModel> {
    const matrixModels = new Array<MatrixAccountingModel>();
    const apays = this.getApayRiiRemarkLines();
    let macNum = '';
    for (const rm of this.pnrObj.rmElements) {
      if (rm.freeFlowText.indexOf('MAC/-') === 0) {
        let model: MatrixAccountingModel;
        macNum = rm.freeFlowText.match(/LK-MAC[0-9]*/g);
        if (macNum !== undefined && macNum !== '') {
          macNum = macNum.toString().replace('LK-MAC', '');
          model = matrixModels.find(x => x.tkMacLine === Number(macNum));
        }
        if (model === null || model === undefined) {
          model = new MatrixAccountingModel();
          matrixModels.push(this.extractMatrixAccount(model, rm.freeFlowText));
        } else {
          this.extractMatrixAccount(model, rm.freeFlowText);
        }
        if (model.bsp === undefined || model.bsp == null || model.bsp === '') { model.bsp = '1'; }// default
        if (rm.associations !== null && rm.associations !== undefined && model !== undefined) {
          model.segmentNo = this.getAssocNumbers(rm.associations);

          if (apays !== null && apays.length > 0) {
            apays.forEach(x => {
              if (x.segments === model.segmentNo) {
                model.bsp = '2';
                model.description = x.remark.match(/PAID (.*) CF-/g).toString().replace('CF-', '').replace('PAID ', '').trim();
                model.accountingTypeRemark = model.description;
              }

            });
          }
        }

      }
    }
    return matrixModels;
  }

  private extractMatrixAccount(model: MatrixAccountingModel, remark: string): MatrixAccountingModel {
    const rem = remark.split('/-');

    rem.forEach(r => {
      const val = r.split('-');
      switch (val[0]) {
        case 'SUP':
          model.supplierCodeName = val[1];
          break;
        case 'LK':
          model.tkMacLine = Number(val[1].replace('MAC', ''));
          break;
        case 'AMT':
          model.baseAmount = (val[1]);
          break;
        case 'PT':
          const pt = val[1].replace('XG', '').replace('XQ', '').replace('XT', '');
          if (model.gst == null) {
            model.gst = parseFloat(pt).toString();
          } else if (model.hst == null) {
            model.hst = parseFloat(pt).toString();
          } else if (model.qst == null) {
            model.qst = parseFloat(pt).toString();
          } else if (model.otherTax == null) {
            model.otherTax = parseFloat(pt).toString();
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
          model.supplierConfirmatioNo = (val[1]);
          break;
        case 'CD':
          model.commisionWithoutTax = (val[1]);
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
    assoc.forEach(x => {
      const segment = this.getSegmentTatooNumber().find(z => z.tatooNo === x.tatooNumber);
      if (segment !== null && segment !== undefined) { s.push(segment.lineNo); }
    });
    return s.join(',');
  }

  getApayRiiRemarkLines() {
    const apays = [];
    if (this.isPNRLoaded) {
      for (const rm of this.pnrObj.riiElements) {
        const rem = rm.fullNode.miscellaneousRemarks.remarks.freetext;
        if (rem.match(/PAID (.*) CF-(.*) PLUS (.*) TAX ON (.*)/g) !== '') {
          apays.push({ lineNum: rm.elementNumber, remark: rem, segments: this.getAssocNumbers(rm.associations) });
        }
      }
    }
    return apays;
  }

  hasNUCRemarks() {
    if (this.isPNRLoaded) {
      for (const rm of this.pnrObj.rmElements) {
        if (rm.freeFlowText === 'NUC') {
          return true;
        }
      }
    }
    return false;
  }

  IsMISRetention() {
    if (this.isPNRLoaded) {
      for (const rm of this.pnrObj.rmElements) {
        if (rm.freeFlowText.indexOf('PNR CANCELLED') > -1) {
          return true;
        }
      }
    }
    return false;
  }
}
