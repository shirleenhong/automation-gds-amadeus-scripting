import { RemarkGroup } from '../models/pnr/remark.group.model';
import { PassiveSegmentModel } from '../models/pnr/passive-segment.model';
import { Injectable } from '@angular/core';
import { RemarkModel } from '../models/pnr/remark.model';
import { PnrService } from './pnr.service';

declare var smartScriptSession: any;

@Injectable({
  providedIn: 'root'
})
export class RemarkService {
  remarksElement: Array<any>;
  crypticCommands = Array<string>();
  deleteRemarksByIds = Array<string>();
  deleteSegmentByIds = Array<string>();
  passiveSegmentElement: Array<any>;
  passiveSegmentGroup: Array<PassiveSegmentModel>;
  responseMessage: string;
  constructor(private pnrService: PnrService) {
    this.deleteRemarksByIds = new Array<string>();
    this.crypticCommands = new Array<string>();
    this.remarksElement = new Array<any>();
  }

  clear() {
    this.deleteRemarksByIds = [];
    this.crypticCommands = [];
    this.remarksElement = [];
    this.deleteSegmentByIds = [];
    this.passiveSegmentElement = [];
  }

  BuildRemarks(remarkGroups: RemarkGroup[]) {
    this.remarksElement = new Array<any>();
    this.passiveSegmentElement = new Array<any>();
    this.deleteRemarksByIds = Array<string>();
    this.deleteSegmentByIds = Array<string>();
    this.crypticCommands = new Array<string>();

    remarkGroups.forEach((group) => {
      if (group !== undefined && group.group !== '') {
        if (group.deleteSegmentByIds != null && group.deleteSegmentByIds.length > 0) {
          group.deleteSegmentByIds.forEach((c) => {
            if (!this.deleteSegmentByIds.find((z) => z === c)) {
              this.deleteSegmentByIds.push(c);
            }
          });
        }

        if (group.deleteRemarkByIds != null && group.deleteRemarkByIds.length > 0) {
          group.deleteRemarkByIds.forEach((c) => {
            if (!this.deleteRemarksByIds.find((z) => z === c)) {
              this.deleteRemarksByIds.push(c);
            }
          });
        }

        if (group.cryptics != null && group.cryptics.length > 0) {
          group.cryptics.forEach((c) => {
            this.crypticCommands.push(c);
          });
        }

        if (group.passiveSegments != null && group.passiveSegments.length > 0) {
          group.passiveSegments.forEach((pas) => {
            this.passiveSegmentElement.push(this.addPassiveSegmentElement(pas));
          });
        }

        if (group.remarks != null && group.remarks.length > 0) {
          group.remarks.forEach((rem) => {
            if (rem) {
              if (rem.remarkType === 'FS') {
                this.remarksElement.push(this.getFSRemarksElement(rem));
              } else {
                // let test = this.getRemarkElement(rem);
                this.remarksElement.push(this.getRemarkElement(rem));
              }
            }
          });
        }
      }
    });
  }

  getFSRemarksElement(remarkModel: RemarkModel) {
    const reference = {
      qualifier: 'OT',
      number: '1'
    };
    const elementManagementData = {
      reference,
      segmentName: 'FS'
    };

    const fareElement = {
      generalIndicator: 'S',
      passengerType: '',
      freetextLong: remarkModel.remarkText
    };

    return { elementManagementData, fareElement };
  }

  getRemarkElement(remarkModel: RemarkModel) {
    const reference = {
      qualifier: 'OT',
      number: '1'
    };
    const elementManagementData = {
      reference,
      segmentName: 'RM'
    };

    const remarks = {
      type: remarkModel.remarkType,
      category: remarkModel.category,
      freetext: remarkModel.remarkText
    };

    const miscellaneousRemark = {
      remarks
    };

    const temp = new Array<any>();
    if (remarkModel.relatedSegments) {
      remarkModel.relatedSegments.forEach((element) => {
        const ref = {
          qualifier: 'ST',
          number: element
        };
        temp.push(ref);
      });
    }

    if (remarkModel.relatedPassengers) {
      remarkModel.relatedPassengers.forEach((element) => {
        const ref = {
          qualifier: 'PT',
          number: element
        };
        temp.push(ref);
      });
    }
    const referenceForDataElement = {
      reference: temp
    };

    // alert(JSON.stringify(referenceForDataElement));
    return {
      elementManagementData,
      miscellaneousRemark,
      referenceForDataElement
    };
  }

  addPassiveSegmentElement(passiveSegmentmodel: PassiveSegmentModel) {
    // alert(passiveSegmentmodel.quantity);
    const reference = {
      qualifier: 'SR',
      number: '1'
    };

    const elementManagementItinerary = {
      reference,
      segmentName: passiveSegmentmodel.segmentName
    };

    const boardPointDetail = {
      cityCode: passiveSegmentmodel.startPoint
    };
    const offPointDetail = {
      cityCode: passiveSegmentmodel.endPoint
    };
    const company = {
      identification: passiveSegmentmodel.vendor
    };

    const productDetails = {
      identification: passiveSegmentmodel.flightNo,
      classOfService: passiveSegmentmodel.classOfService
    };

    const travelProductProduct: { [k: string]: any } = {
      depDate: passiveSegmentmodel.startDate,
      depTime: passiveSegmentmodel.startTime,
      arrDate: passiveSegmentmodel.endDate,
      arrTime: passiveSegmentmodel.endTime
    };

    const travelProduct: { [k: string]: any } = {
      product: travelProductProduct,
      boardpointDetail: boardPointDetail,
      offpointDetail: offPointDetail,
      company
    };

    if (passiveSegmentmodel.passiveSegmentType === 'AIR') {
      travelProduct.productDetails = productDetails;
    }

    if (passiveSegmentmodel.passiveSegmentType === 'CAR') {
      travelProduct.productDetails = {
        identification: passiveSegmentmodel.carType
      };
    }

    const relatedProduct = {
      quantity: passiveSegmentmodel.quantity.toString(),
      status: passiveSegmentmodel.status
    };

    const messageActionBusiness = {
      function: passiveSegmentmodel.function
    };

    const messageAction = {
      business: messageActionBusiness
    };

    const freeTextItineraryDetail = {
      subjectQualifier: '3',
      type: 'P19'
    };

    const freeTextItinerary = {
      freetextDetail: freeTextItineraryDetail,
      longFreetext: passiveSegmentmodel.freeText
    };

    const reservation = {
      companyId: passiveSegmentmodel.vendor,
      controlNumber: passiveSegmentmodel.controlNo
    };

    const reservation2 = {
      reservation
    };

    const selection = {
      option: 'P10'
    };

    const selection2 = {
      selection
    };

    const airAuxItinerary: { [k: string]: any } = {
      travelProduct,
      messageAction,
      relatedProduct
    };

    if (passiveSegmentmodel.passiveSegmentType === 'AIR') {
      airAuxItinerary.selectionDetailsAir = selection2;
      airAuxItinerary.reservationInfoSell = reservation2;
    } else {
      airAuxItinerary.freetextItinerary = freeTextItinerary;
    }
    const temp = new Array<any>();
    if (passiveSegmentmodel.relatedPassengers) {
      passiveSegmentmodel.relatedPassengers.forEach((element) => {
        const ref = {
          qualifier: 'PT',
          number: element
        };
        temp.push(ref);
      });
    }
    const referenceForSegment = {
      reference: temp
    };

    return {
      elementManagementItinerary,
      airAuxItinerary,
      referenceForSegment
    };
  }

  sendCryptics() {
    this.crypticCommands.forEach((command) => {
      smartScriptSession.send(command);
    });
  }

  deleteSegments() {
    let deleteIds = '';
    this.deleteSegmentByIds.forEach((ids) => {
      deleteIds += ids + ',';
    });
    if (deleteIds !== '') {
      deleteIds = deleteIds.slice(0, -1);
      smartScriptSession.send('XE' + deleteIds);
    }
  }

  deleteRemarks() {
    let deleteIds = '';
    const filteredIds = this.sortArrayForDelete(this.deleteRemarksByIds);
    filteredIds.forEach((ids) => {
      deleteIds += ids + ',';
    });
    if (deleteIds !== '') {
      deleteIds = deleteIds.slice(0, -1);
      smartScriptSession.send('XE' + deleteIds);
    }
  }

  sortArrayForDelete(arr) {
    const dl = arr.sort((a, b) => {
      return Number(a.toString().split('-')[0]) - Number(b.toString().split('-')[0]);
    });
    // return dl;
    const newArr = [];
    let tmp = '';
    let tmpIndx = 0;
    for (let i = 0; i < dl.length; i++) {
      tmp = '';
      tmpIndx = 0;
      for (let j = i + 1; j < dl.length; j++) {
        if (dl[j - 1].indexOf('-') >= 0 || dl[j].indexOf('-') >= 0) {
          break;
        }

        if (Number(dl[j - 1]) + 1 === Number(dl[j])) {
          tmp = dl[j];
          tmpIndx = j;
        } else {
          break;
        }
      }
      if (tmp === '') {
        if (i > 0 && dl[i - 1].indexOf('-') > 0) {
          if (Number(dl[i - 1].split('-')[1]) < Number(dl[i])) {
            newArr.push(dl[i]);
          }
        } else {
          newArr.push(dl[i]);
        }
      } else {
        newArr.push(dl[i] + '-' + tmp);
        i = tmpIndx;
      }
    }
    return newArr;
  }

  async sendRemarks(requestor?: string) {
    const pnrActions = {
      optionCode: '0'
    };
    let dataElementsMaster;
    let originDestination;
    let originDestinationDetails;

    if (this.passiveSegmentElement.length > 0) {
      originDestination = {
        origin: '',
        destination: ''
      };

      originDestinationDetails = {
        originDestination,
        itineraryInfo: this.passiveSegmentElement
      };
    }

    if (this.remarksElement.length > 0) {
      dataElementsMaster = {
        marker1: '',
        dataElementsIndiv: this.remarksElement
      };
    }

    const remarkElements = {
      pnrActions,
      originDestinationDetails,
      dataElementsMaster
    };
    console.log(JSON.stringify(remarkElements));
    await smartScriptSession.requestService('ws.addMultiElement_v14.1', remarkElements).then(
      () => {
        this.responseMessage = 'Remarks Updated';

        if (requestor) {
          this.endPNR(requestor);
        } else {
          this.endPNR('CWTSCRIPT');
        }

        smartScriptSession.getActiveTask().then((x) => {
          if (x.subtype === 'PNR') {
            smartScriptSession.requestService('bookingfile.refresh', null, {
              fn: '',
              scope: this
            });
          }
        });
      },
      (error) => {
        this.responseMessage = JSON.stringify(error);
      }
    );
  }

  async SubmitRemarks() {
    this.deleteRemarks();
    this.deleteSegments();
    await this.sendCryptics();
    await this.sendRemarks();
    this.clear();
  }

  async cancelRemarks(requestor) {
    await this.deleteRemarks();
    await this.sendCryptics();
    await this.sendRemarks(requestor);
    this.clear();
  }

  async cancelOSIRemarks() {
    await this.sendCryptics();
    this.clear();
  }

  endPNR(requestor) {
    if (this.pnrService.pnrObj.tkElements.length < 1) {
      smartScriptSession.send('TKOK');
    }
    smartScriptSession.send('RF' + requestor);
    smartScriptSession.send('ER');
    smartScriptSession.send('RT');
  }
}
