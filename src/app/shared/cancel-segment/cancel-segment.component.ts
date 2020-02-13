import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { SelectItem } from 'src/app/models/select-item.model';
import { PnrService } from 'src/app/service/pnr.service';
import { UtilHelper } from 'src/app/helper/util.helper';
import { validateSegmentNumbers, validatePassengerNumbers } from 'src/app/shared/validators/leisure.validators';
import { CounselorDetail } from 'src/app/globals/counselor-identity';
import { TicketModel } from 'src/app/models/pnr/ticket.model';
import { BspRefundComponent } from 'src/app/corporate/corp-cancel/bsp-refund/bsp-refund.component';
import { NonBspTicketCreditComponent } from 'src/app/corporate/corp-cancel/non-bsp-ticket-credit/non-bsp-ticket-credit.component';
import { DDBService } from '../../service/ddb.service';
import { ReasonCodeTypeEnum } from 'src/app/enums/reason-code.enum';
import { ReasonCode } from 'src/app/models/ddb/reason-code.model';
// import { DDBService } from '../../service/ddb.service';
// import { BsModalRef, BsModalService } from 'ngx-bootstrap';
// import { MessageType } from '../message/MessageType';
// import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-cancel-segment',
  templateUrl: './cancel-segment.component.html',
  styleUrls: ['./cancel-segment.component.scss']
})
export class CancelSegmentComponent implements OnInit {
  @ViewChild(BspRefundComponent) bspRefundComponent: BspRefundComponent;
  @ViewChild(NonBspTicketCreditComponent) nonBspTicketCreditComponent: NonBspTicketCreditComponent;
  cancelForm: FormGroup;
  reasonAcList: Array<SelectItem>;
  followUpOptionList: Array<SelectItem>;
  voidList: Array<SelectItem>;
  reasonUaList: Array<SelectItem>;
  cancelProcessList: Array<SelectItem>;
  relationshipList: Array<SelectItem>;
  reasonNonACCancelList: Array<SelectItem>;
  reverseItemList: Array<SelectItem>;
  segments = [];
  isAC = false;
  isUA = false;
  isOthers = false;
  isACNonRef = false;
  isUANonRef = false;
  passengers = [];
  codeShareGroup: FormGroup;
  remove = false;
  add = true;
  acremove = false;
  acadd = true;
  headerRefund = 'Refund Commission Recall';
  isACPassive = false;
  preCancel = false;
  isCorporate = false;
  isVoid = false;
  cancelTkModel = new TicketModel();
  // modalRef: BsModalRef;
  isBSP = false;
  isNonBSP = false;
  isVoided = false;
  showEBDetails: boolean;
  ebRList: { itemValue: string; itemText: string }[];
  ticketVoidList = [];
  hasUnvoided = false;
  ticketArray = [];
  ebCList: Array<ReasonCode> = [];

  constructor(
    private formBuilder: FormBuilder,
    private pnrService: PnrService,
    private utilHelper: UtilHelper,
    private counselorDetail: CounselorDetail,
    private ddbService: DDBService
  ) {
    // private counselorDetail: CounselorDetail, private modalService: BsModalService) {
    this.cancelForm = new FormGroup({
      segments: new FormArray([]),
      requestor: new FormControl('', [Validators.required]),
      desc1: new FormControl('', [Validators.required]),
      desc2: new FormControl('', []),
      reasonACCancel: new FormControl('', []),
      reasonUACancel: new FormControl('', []),
      tickets: new FormArray([this.createFormGroup()]),
      airlineNo: new FormControl('', []),
      acTicketNo: new FormControl('', []),
      acFlightNo: new FormControl('', []),
      // accityPair: new FormControl('', []),
      // acdepDate: new FormControl('', []),
      relationship: new FormControl('', []),
      uasegNo: new FormControl('', [Validators.pattern('[0-9]+(,[0-9]+)*'), validateSegmentNumbers(this.segments)]),
      uaPassengerNo: new FormControl('', [Validators.pattern('[0-9]+(,[0-9]+)*'), validatePassengerNumbers(this.passengers)]),
      acpassengerNo: new FormControl('', []),
      cancelNonRefAC: new FormControl('', []),
      cancelNonRefUA: new FormControl('', []),
      cancelAll: new FormControl('', []),
      followUpOption: new FormControl('', []),
      acCancelMonth: new FormControl('', []),
      acCancelYear: new FormControl('', []),
      cancelProcess: new FormControl('', []),
      reasonNonACCancel: new FormControl('', []),
      actickets: new FormArray([this.createAcFormGroup()]),
      cFirstInitial: new FormControl('', []),
      cLastName: new FormControl('', []),
      reuseCC: new FormControl('', []),
      authorization: new FormControl('', []),
      reverseItem: new FormControl('', []),
      otherDetails1: new FormControl('', []),
      otherDetails2: new FormControl('', []),
      voidOption: new FormControl('', []),
      ticketNumber: new FormControl('', []),
      vRsnOption: new FormControl('', []),
      ticketList: new FormControl('', []),
      ticketVoidList: new FormArray([])
    });
    // this.showMessage();
    // this.checkHasPowerHotel();
    // this.checkCorpPreCancel();
    this.onChanges();
  }

  async ngOnInit() {
    this.isCorporate = this.counselorDetail.getIsCorporate();
    // this.codeShareGroup = this.formBuilder.group({
    //   tickets: this.formBuilder.array([this.createFormGroup()])
    // });
    this.isCorporate = this.counselorDetail.getIsCorporate();
    await this.loadStaticValue();
    this.getSegmentTatooValue();
    this.addCheckboxes();
    this.checkFirstSegment();
    this.getPassengers();
    this.checkCorpPreCancel();
    this.checkVoid();
    this.loadTicketList();
    this.addTicketList();
  }

  private onChanges(): void {
    this.cancelForm.get('reuseCC').valueChanges.subscribe((x) => {
      if (x === 'yes') {
        this.cancelForm.get('authorization').setValidators([Validators.required]);
        this.enableFormControls(['authorization'], false);
      } else {
        this.cancelForm.get('authorization').clearValidators();
        this.enableFormControls(['authorization'], true);
      }
    });
  }

  private addCheckboxes() {
    let forchecking = true;
    if (this.segments.length > 1) {
      forchecking = false;
    }

    this.segments.map((_o, i) => {
      const control = new FormControl(i === 0 && forchecking); // if first item set to true, else false
      (this.cancelForm.controls.segments as FormArray).push(control);
    });
  }

  private addTicketList() {
    this.cancelForm.controls.ticketList.setValue(this.ticketVoidList);
    this.ticketVoidList.map((_o) => {
      const control = new FormControl(false);
      (this.cancelForm.controls.ticketVoidList as FormArray).push(control);
    });
  }

  checkTicket(item, freeFlowText) {
    const checked = this.cancelForm.controls.ticketVoidList.value[item];
    if (checked && freeFlowText.split('/')[1].substr(2, 1) === 'V') {
      this.ticketArray[item] = true;
    } else if (checked && freeFlowText.split('/')[1].substr(2, 1) !== 'V') {
      this.ticketArray[item] = false;
    } else {
      this.ticketArray[item] = true;
    }

    this.hasUnvoided = false;
    this.ticketArray.forEach((x) => {
      if (x === false) {
        this.hasUnvoided = true;
        this.cancelForm.controls.authorization.setValue('');
        this.enableFormControls(['requestor'], true);
        this.cancelForm.controls.requestor.setValue('');
      } else {
        this.hasUnvoided = false;
        this.enableFormControls(['requestor'], false);
      }
    });
  }

  private checkCorpPreCancel() {
    const eba = this.pnrService.getRemarkText('EB/-EBA');
    const cxl = this.pnrService.getRemarkText('CB/CXL/PNR');
    if (this.isCorporate && eba && cxl) {
      this.cancelForm.controls.requestor.setValue('PAX CXLD PNR VIA OBT');
      this.cancelForm.controls.desc1.setValue('PAX CXLD PNR VIA OBT');
    }
  }

  private checkVoid() {
    this.isCorporate = this.counselorDetail.getIsCorporate();
    const eba = this.pnrService.getRemarkText('EB/-EBA');
    const cxl = this.pnrService.getRemarkText('CB/CXL/PNR');
    const voidCorp = this.pnrService.getRemarkText('CB/VOID/TICKET');

    if (this.isCorporate && eba && cxl && voidCorp) {
      this.isVoid = true;
    }
  }

  checkValid() {
    this.utilHelper.validateAllFields(this.cancelForm);
    if (!this.cancelForm.valid) {
      return false;
    }
    if (this.f.followUpOption.value === 'BSPREFUND' || this.f.followUpOption.value === 'NONBSPREFUND') {
      this.utilHelper.validateAllFields(this.bspRefundComponent.refundForm);
      if (!this.bspRefundComponent.refundForm.valid) {
        if (this.bspRefundComponent.refundType === 'nonbsp') {
          return false;
        } else if (!this.bspRefundComponent.refundForm.get('tickets').valid) {
          return false;
        }
      }
    }
    if (this.f.followUpOption.value === 'NONBSPRECREDIT') {
      this.utilHelper.validateAllFields(this.nonBspTicketCreditComponent.nonBspForm);
      if (!this.nonBspTicketCreditComponent.nonBspForm.valid) {
        return false;
      }
    }

    return true;
  }

  async loadStaticValue() {
    const self = this;
    this.reasonAcList = [
      { itemText: '', itemValue: '' },
      { itemText: '24 HOURS REFUND', itemValue: '4' },
      { itemText: 'DEATH OF PAX OR TRAVELLING COMPANION', itemValue: '5' },
      { itemText: 'IRROP: WILL REFUND PROCESS DUE IRROP', itemValue: '6' },
      { itemText: 'UNACCEPTABLE SCHEDULE CHANGE', itemValue: '9' },
      { itemText: 'UNACCEPTABLE DELAY GREATER THAN 2 HRS', itemValue: '10' },
      { itemText: 'JURY/MILITARY DUTY', itemValue: '11' },
      { itemText: 'VOLUNTARY CANCEL', itemValue: '7' },
      { itemText: 'AC FLIGHT NOT TICKETED YET', itemValue: '8' }
    ];

    if (this.isAC) {
      this.reasonAcList.push(
        { itemText: 'NAME CORRECTION NCC WITH OAL', itemValue: '1' },
        { itemText: 'NAME CORRECTION NCC LEGAL NAME WITH OAL', itemValue: '2' },
        { itemText: 'DUPLICATE TICKETS', itemValue: '3' }
      );
    }

    this.reasonUaList = [
      { itemText: '', itemValue: '' },
      { itemText: '24 HOURS REFUND', itemValue: '1' },
      { itemText: 'VOLUNTARY CANCEL', itemValue: '2' },
      { itemText: 'UA FLIGHT NOT TICKETED YET', itemValue: '3' },
      { itemText: 'NON REFUNDABLE TICKET CANCELLED DUE TO IROP', itemValue: '4' },
      { itemText: 'NON REFUNDABLE TICKET CANCELLED DUE TO SCHEDULE CHANGE', itemValue: '5' }
    ];

    if (this.isCorporate) {
      this.followUpOptionList = [
        { itemText: '', itemValue: '' },
        { itemText: 'BSP Ticket Refund', itemValue: 'BSPREFUND' },
        { itemText: 'BSP Queue for Refund', itemValue: 'BSP Queue' },
        { itemText: 'BSP Keep Ticket for Future Travel/Cancel Segments Only', itemValue: 'BSPKT' },
        { itemText: 'Non BSP Keep Ticket for Future Travel/Cancel Segments Only', itemValue: 'NONBSPKT' },
        { itemText: 'Non BSP Ticket Refund', itemValue: 'NONBSPREFUND' },
        { itemText: 'Non BSP Ticket Recredit', itemValue: 'NONBSPRECREDIT' },
        { itemText: 'Void - BSP Ticket', itemValue: 'Void BSP' },
        { itemText: 'Void - Non BSP Matrix Reversal', itemValue: 'Void Non BSP' },
        { itemText: 'Hotel, Car or Limo', itemValue: 'HOTELCARLIMO' }
      ];
    } else {
      this.followUpOptionList = [
        { itemText: '', itemValue: '' },
        { itemText: 'BSP Queue for Refund', itemValue: 'BSP Queue' },
        { itemText: 'Non BSP Refund Recall Commission Request', itemValue: 'Non BSP Refund' },
        { itemText: 'Keep Ticket for Future Travel/Cancel Segments Only', itemValue: 'Keep Ticket' }
      ];
    }

    this.voidList = [
      { itemText: '', itemValue: '' },
      { itemText: 'VOID entry successfully completed by OBT', itemValue: 'VoidComplete' },
      { itemText: 'OBT was unable to VOID ticket/Consultant will complete VOID entry', itemValue: 'VoidNotComplete' }
    ];

    this.cancelProcessList = [
      { itemText: '', itemValue: '' },
      { itemText: 'AC Flt(s) cancelled prior to script run', itemValue: 'PRIOR' },
      { itemText: 'AC Flt(s) were never booked in the PNR', itemValue: 'NEVER' }
    ];

    this.relationshipList = [
      { itemText: '', itemValue: '' },
      { itemText: 'FATHER', itemValue: 'FTHR' },
      { itemText: 'MOTHER', itemValue: 'MTHR' },
      { itemText: 'SISTER', itemValue: 'SIST' },
      { itemText: 'BROTHER', itemValue: 'BROT' },
      { itemText: 'GRANDMOTHER', itemValue: 'GMTH' },
      { itemText: 'GRANDFATHER', itemValue: 'GFTH' },
      { itemText: 'CHILD', itemValue: 'CHLD' },
      { itemText: 'GRANDCHILD', itemValue: 'GCHL' },
      { itemText: 'COMPANION', itemValue: 'COMP' }
    ];

    this.reasonNonACCancelList = [
      { itemText: 'NON REFUNDABLE TICKET CANCELLED DUE TO IROP', itemValue: 'IROP' },
      { itemText: 'NON REFUNDABLE TICKET CANCELLED DUE TO SCHEDULE CHANGE', itemValue: 'CHANGE' },
      { itemText: 'NONE OF THE ABOVE', itemValue: 'NONE' }
    ];

    this.reverseItemList = [
      { itemText: '', itemValue: '' },
      { itemText: 'Reverse All Items', itemValue: 'REVERSE MATRIX ALL ITEMS' },
      { itemText: 'Reverse Fee only', itemValue: 'FEE ONLY' },
      { itemText: 'Reverse Document', itemValue: 'DOCUMENT ONLY' }
    ];

    await this.ddbService.getReasonCodeByTypeId([ReasonCodeTypeEnum.TouchReason], 8).then((x) => {
      self.ebCList = x;
    });
    this.ebRList = [
      { itemValue: 'AM', itemText: 'AM- Full Service Agent Assisted' },
      { itemValue: 'CT', itemText: 'CT- Online Agent Assisted' }
    ];
  }

  get f() {
    return this.cancelForm.controls;
  }

  getSegmentTatooValue() {
    const segmentDetails = this.pnrService.getSegmentList();
    segmentDetails.forEach((element) => {
      if (segmentDetails.length > 0) {
        const details = {
          id: element.lineNo,
          name: element.longFreeText,
          status: element.status,
          segmentType: element.segmentType,
          airlineCode: element.airlineCode,
          flightNumber: element.flightNumber,
          departureDate: element.departureDate,
          cityCode: element.cityCode,
          arrivalAirport: element.arrivalAirport,
          tatooNo: element.tatooNo
        };
        this.segments.push(details);
      }
    });
  }

  loadTicketList() {
    this.ticketVoidList = this.pnrService.getTicketList();
  }

  getPassengers() {
    this.passengers = this.pnrService.getPassengers();
  }

  submit() {
    // Filter out the unselected ids
    const checkSegment = [];
    const selectedPreferences = this.cancelForm.value.segments
      .map((checked, index) => (checked ? this.segments[index].id : null))
      .filter((value) => value !== null);
    selectedPreferences.forEach((element) => {
      const look = this.segments.find((x) => x.id === element);
      if (look) {
        const textLine = {
          lineNo: look.id,
          segmentType: look.segmentType
        };
        checkSegment.push(textLine);
      }
    });
    return checkSegment;
  }

  checkSegmentAirline() {
    this.isAC = false;
    this.isUA = false;
    this.isOthers = false;
    // this.cancelForm.controls['cancelNonRefAC'].setValue(false);
    if (this.reasonAcList.length > 9) {
      this.reasonAcList.splice(9, 3);
    }

    this.enableFormControls(['acFlightNo', 'relationship'], true);
    this.enableFormControls(['reasonUACancel', 'uasegNo', 'uaPassengerNo'], true);
    const selectedPreferences = this.cancelForm.value.segments
      .map((checked, index) => (checked ? this.segments[index].id : null))
      .filter((value) => value !== null);

    if (selectedPreferences.length === 0) {
      this.isOthers = true;
    }

    selectedPreferences.forEach((element) => {
      const look = this.segments.find((x) => x.id === element);
      if (look) {
        if (look.airlineCode === 'AC') {
          this.isAC = true;
          if (
            (this.cancelForm.controls.reasonUACancel.value !== '4' || this.cancelForm.controls.reasonUACancel.value !== '5') &&
            this.cancelForm.controls.reasonNonACCancel.value !== 'IROP' &&
            this.cancelForm.controls.reasonNonACCancel.value !== 'CHANGE'
          ) {
            this.enableFormControls(['airlineNo'], true);
          }
          this.reasonAcList.push(
            { itemText: 'NAME CORRECTION NCC WITH OAL', itemValue: '1' },
            { itemText: 'NAME CORRECTION NCC LEGAL NAME WITH OAL', itemValue: '2' },
            { itemText: 'DUPLICATE TICKETS', itemValue: '3' }
          );
          if (this.cancelForm.value.reasonACCancel === '' || this.cancelForm.value.reasonACCancel === undefined) {
            this.cancelForm.controls.acFlightNo.setValue('');
            this.cancelForm.controls.relationship.setValue('');
          } else {
            this.acChange(this.cancelForm.value.reasonACCancel);
          }
        }
        if (look.airlineCode === 'UA') {
          this.isUA = true;
          if (this.f.followUpOption.value !== 'NONBSPKT') {
            this.enableFormControls(['reasonUACancel'], false);
          }
          if (this.cancelForm.value.reasonUACancel === '' || this.cancelForm.value.reasonUACancel === undefined) {
            // this.cancelForm.controls['reasonUACancel'].setValue('');
            this.cancelForm.controls.uasegNo.setValue('');
            this.cancelForm.controls.uaPassengerNo.setValue('');
          } else {
            this.uaChange(this.cancelForm.value.reasonUACancel);
          }
          this.defaultSegment();
        }
        if (look.airlineCode !== 'UA' && look.airlineCode !== 'AC') {
          this.isOthers = true;
          if (this.cancelForm.value.reasonUACancel) {
            this.cancelForm.controls.airlineNo.setValue('');
          } else {
            this.acChange(this.cancelForm.value.reasonACCancel);
          }
        }
        // this.checkPowerHotelCancellation(look);
      }
    });
    this.loadStaticValue();
  }

  // checkHasPowerHotel() {
  //   if (this.isCorporate) {
  //     const segmentDetails = this.pnrService.getSegmentList();
  //     for (const seg of segmentDetails) {
  //       if (seg.segmentType === 'HTL') {
  //         return true;
  //       }
  //     }
  //     return false;
  //   }
  // }

  // showMessage() {
  //   this.modalRef = this.modalService.show(MessageComponent, {
  //     backdrop: 'static'
  //   });
  //   this.modalRef.content.modalRef = this.modalRef;
  //   this.modalRef.content.title = 'Hotel(s) booked via Power Hotel';
  //   this.modalRef.content.message = 'Power Hotel segment(s) must be cancelled in Power Hotel first before launching cancellation script';
  //   this.modalRef.content.callerName = 'Cancel';
  //   this.modalRef.content.response = '';
  //   // this.modalRef.content.paramValue = r;
  //   this.modalRef.content.setMessageType(MessageType.Default);
  // }

  // modalSubscribeOnClose() {
  //   this.modalService.onHide.subscribe(() => {
  //     if (this.modalRef !== undefined && this.modalRef.content !== undefined) {
  //       if (this.modalRef.content.callerName === 'Cancel' && this.modalRef.content.response === 'NO') {

  //       }
  //     }
  //   });
  // }

  checkFirstSegment() {
    if (this.reasonAcList.length > 9) {
      this.reasonAcList.splice(9, 3);
    }

    this.enableFormControls(['acFlightNo', 'relationship'], true);
    this.enableFormControls(['reasonUACancel', 'uasegNo', 'uaPassengerNo'], true);
    if (this.segments.length === 1 && this.segments[0].segmentType) {
      if (this.segments[0].airlineCode === 'AC') {
        this.isAC = true;
        this.reasonAcList.push(
          { itemText: 'NAME CORRECTION NCC WITH OAL', itemValue: '1' },
          { itemText: 'NAME CORRECTION NCC LEGAL NAME WITH OAL', itemValue: '2' },
          { itemText: 'DUPLICATE TICKETS', itemValue: '3' }
        );
      }
      if (this.segments.length === 1 && this.segments[0].airlineCode === 'UA') {
        this.isUA = true;
        if (this.f.followUpOption.value !== 'NONBSPKT') {
          this.enableFormControls(['reasonUACancel'], false);
        }
      }
      if (this.segments[0].airlineCode !== 'AC' && this.segments[0].airlineCode !== 'UA') {
        this.isOthers = true;
      }
    }
    this.remove = false;
    this.add = true;
    this.loadStaticValue();
  }

  acChange(newValue) {
    switch (newValue) {
      case '1':
      case '2':
      case '3':
        this.enableFormControls(['acFlightNo', 'relationship', 'acCancelMonth', 'acCancelYear'], true);
        break;
      case '4':
        this.enableFormControls(['acFlightNo', 'relationship', 'acCancelMonth', 'acCancelYear'], true);
        break;
      case '5':
        this.enableFormControls(['relationship'], false);
        this.enableFormControls(['acFlightNo', 'acCancelMonth', 'acCancelYear'], true);
        break;
      case '6':
      case '9':
      case '10':
        this.enableFormControls(['acFlightNo'], false);
        this.enableFormControls(['relationship', 'acCancelMonth', 'acCancelYear'], true);
        break;
      case '11':
        this.enableFormControls(['acCancelMonth', 'acCancelYear'], false);
        this.enableFormControls(['relationship', 'acFlightNo'], true);
        break;
      default:
        this.enableFormControls(['acFlightNo', 'relationship', 'acCancelMonth', 'acCancelYear'], true);
        break;
    }
    this.checkAcTicketPassenger(newValue);
    this.defaultControls();
    this.resetAcTicket(newValue);
  }

  checkAcTicketPassenger(newValue) {
    const arr = this.cancelForm.get('actickets') as FormArray;

    if ((newValue === '1' || newValue === '2' || newValue === '3') && this.isAC) {
      for (const c of arr.controls) {
        c.get('acTicketNo').enable();
        c.get('acpassengerNo').enable();
        c.get('acTicketNo').setValidators([Validators.required]);
        c.get('acpassengerNo').setValidators([Validators.required]);
        c.get('acTicketNo').updateValueAndValidity();
        c.get('acpassengerNo').updateValueAndValidity();
      }
    } else {
      for (const c of arr.controls) {
        c.get('acTicketNo').clearValidators();
        c.get('acpassengerNo').clearValidators();
        c.get('acTicketNo').disable();
        c.get('acpassengerNo').disable();
        c.get('acTicketNo').updateValueAndValidity();
        c.get('acpassengerNo').updateValueAndValidity();
      }
    }
  }

  defaultControls() {
    let acCount = 0;
    let controlsArr = [];
    const pass = this.getPassengerNo();

    const selectedPreferences = this.cancelForm.value.segments
      .map((checked, index) => (checked ? this.segments[index].id : null))
      .filter((value) => value !== null);
    selectedPreferences.forEach((element) => {
      const look = this.segments.find((x) => x.id === element);
      if (look) {
        if (look.airlineCode === 'AC') {
          acCount = acCount + 1;
          controlsArr = [
            { control: 'acFlightNo', controlvalue: look.flightNumber },
            { control: 'acpassengerNo', controlvalue: pass }
          ];
        }
      }
    });

    this.initializeControl(controlsArr);
  }

  private getPassengerNo() {
    const passenger = this.pnrService.getPassengers();
    let pass = '';
    if (passenger.length === 1) {
      pass = '1';
    }
    return pass;
  }

  initializeControl(controls: any) {
    const acControls = ['acFlightNo', 'relationship'];
    acControls.forEach((ac) => {
      this.cancelForm.get(ac).setValue('');
    });
    controls.forEach((c) => {
      this.cancelForm.get(c.control).setValue(c.controlvalue);
    });
  }

  defaultSegment() {
    let ua = '';
    const selectedPreferences = this.cancelForm.value.segments
      .map((checked, index) => (checked ? this.segments[index].id : null))
      .filter((value) => value !== null);
    selectedPreferences.forEach((element) => {
      const look = this.segments.find((x) => x.id === element);
      if (look) {
        if (look.airlineCode === 'UA') {
          ua = ua + ',' + look.id;
        }
      }
    });

    this.cancelForm.controls.uasegNo.setValue(ua.substr(1));
  }

  uaChange(newValue) {
    if (this.cancelForm.controls.reasonNonACCancel.value !== 'IROP' && this.cancelForm.controls.reasonNonACCancel.value !== 'CHANGE') {
      this.enableFormControls(['airlineNo'], true);
    }

    switch (newValue) {
      case '1':
        this.enableFormControls(['uasegNo', 'uaPassengerNo'], false);
        this.defaultSegment();
        this.cancelForm.controls.uaPassengerNo.setValue(this.getPassengerNo());
        break;
      case '4':
      case '5':
        this.enableFormControls(['airlineNo'], false);
        break;
      default:
        this.enableFormControls(['uasegNo', 'uaPassengerNo'], true);
        break;
    }
  }

  enableFormControls(controls: string[], disabled: boolean) {
    controls.forEach((c) => {
      if (disabled) {
        this.cancelForm.get(c).disable();
      } else {
        this.cancelForm.get(c).enable();
        this.cancelForm.get(c).setValidators(Validators.required);
        this.cancelForm.get(c).updateValueAndValidity();
      }
    });
  }

  createFormGroup(): FormGroup {
    const group = this.formBuilder.group({
      ticket: new FormControl('', []),
      coupon: new FormControl('', [])
    });

    return group;
  }

  createAcFormGroup(): FormGroup {
    const group = this.formBuilder.group({
      acTicketNo: new FormControl('', []),
      acpassengerNo: new FormControl('', [])
    });

    return group;
  }

  resetAcTicket(acReasonCode) {
    if ((acReasonCode === '1' || acReasonCode === '2' || acReasonCode === '3') && this.isAC) {
      const items = this.cancelForm.controls.tickets as FormArray;
      const acitems = this.cancelForm.controls.actickets as FormArray;

      while (items.length) {
        items.removeAt(0);
      }
      while (acitems.length) {
        acitems.removeAt(0);
      }

      items.push(this.createFormGroup());
      acitems.push(this.createAcFormGroup());
    }
  }

  addTicketCoupon() {
    const items = this.cancelForm.controls.tickets as FormArray;
    items.push(this.createFormGroup());
    if (items.length < 6) {
      this.add = true;
      this.remove = true;
    } else {
      this.add = false;
    }
    // this.total = items.length;
  }

  removeTicketCoupon(i) {
    const items = this.cancelForm.controls.tickets as FormArray;
    items.removeAt(i);
    if (items.length > 1) {
      this.remove = true;
    } else {
      this.remove = false;
    }
    // this.total = items.length;
  }

  addAcTicket() {
    const items = this.cancelForm.controls.actickets as FormArray;
    items.push(this.createAcFormGroup());
    if (items.length > 1) {
      this.acremove = true;
    }
    this.checkAcTicketPassenger('1');
    this.addTicketCoupon();
  }

  removeAcTicket(i) {
    const items = this.cancelForm.controls.actickets as FormArray;
    items.removeAt(i);
    if (items.length > 1) {
      this.acremove = true;
    } else {
      this.acremove = false;
    }
    this.checkAcTicketPassenger('1');
    this.removeTicketCoupon(i);
  }

  acTicketChange(ticketValue, i) {
    const items = this.cancelForm.controls.tickets as FormArray;
    const fgTicket = items.controls[i] as FormGroup;
    fgTicket.controls.ticket.setValue(ticketValue);
  }

  cancelAll(checkValue) {
    const segment = this.cancelForm.controls.segments as FormArray;
    segment.controls.forEach((element) => {
      element.setValue(checkValue);
    });
    this.checkSegmentAirline();
  }

  changefollowUpOption(followUp) {
    switch (followUp) {
      case 'Keep Ticket':
      case 'Non BSP Refund':
        this.enableFormControls(
          ['acFlightNo', 'relationship', 'reasonACCancel', 'reasonACCancel', 'reasonUACancel', 'uasegNo', 'uaPassengerNo', 'tickets'],
          true
        );
        this.checkAcTicketPassenger('');
        break;
      case 'Void BSP':
        this.isBSP = true;
        this.isNonBSP = false;
        this.enableFormControls(
          ['acFlightNo', 'relationship', 'reasonACCancel', 'reasonACCancel', 'reasonUACancel', 'uasegNo', 'uaPassengerNo', 'tickets'],
          true
        );
        break;
      case 'Void Non BSP':
        this.isBSP = false;
        this.isNonBSP = true;
        this.enableFormControls(
          ['acFlightNo', 'relationship', 'reasonACCancel', 'reasonACCancel', 'reasonUACancel', 'uasegNo', 'uaPassengerNo', 'tickets'],
          true
        );
        break;
      case 'BSP Queue':
        this.enableFormControls(['acFlightNo', 'relationship', 'reasonACCancel', 'reasonACCancel', 'tickets'], false);
        this.checkAcTicketPassenger(this.cancelForm.controls.reasonACCancel.value);
        break;
      case 'NONBSPKT':
        this.enableFormControls(['reasonUACancel'], true);
        this.enableFormControls(['tickets'], false);
        break;
      case 'HOTELCARLIMO':
        this.isNonBSP = false;
        break;
      default:
        this.enableFormControls(
          [
            'acFlightNo',
            'relationship',
            'reasonACCancel',
            'reasonACCancel',
            'reasonUACancel',
            'uasegNo',
            'uaPassengerNo',
            'tickets',
            'authorization'
          ],
          true
        );
        break;
    }

    this.headerRefund = 'Non BSP Refund Commission Recall';
  }

  changeVoidOption(followUp) {
    if (followUp === 'VoidComplete') {
      this.cancelForm.controls.requestor.setValue('PAX Cancelled BSP PNR on OBT');
      this.cancelForm.controls.desc1.setValue('PAX Cancelled BSP PNR on OBT');
    }
  }

  changeCancelCheck(option) {
    if (option === 'NEVER') {
      this.enableFormControls(['acFlightNo', 'relationship', 'acCancelMonth', 'acCancelYear', 'reasonACCancel'], true);
    } else if (!this.isAC) {
      this.enableFormControls(['reasonACCancel'], false);
    }
  }

  onchangeNonAcReasonCancel(nonAcValue) {
    if (this.cancelForm.controls.reasonUACancel.value !== '4' && this.cancelForm.controls.reasonUACancel.value !== '5') {
      this.enableFormControls(['airlineNo'], true);
    }

    if (nonAcValue !== 'NONE') {
      this.enableFormControls(['airlineNo'], false);
    }
  }
}
