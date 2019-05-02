import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { TourSegmentViewModel } from 'src/app/models/tour-segment-view.model';
import { UpdateSegmentComponent } from '../update-segment/update-segment.component';
import { PassiveSegmentsModel } from 'src/app/models/pnr/passive-segments.model';
import { SegmentsViewModel } from 'src/app/models/segments-view.model';
import { UtilHelper } from 'src/app/helper/util.helper';
import { PnrService } from 'src/app/service/pnr.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-segments',
  templateUrl: './segments.component.html',
  styleUrls: ['./segments.component.scss']
})
export class SegmentsComponent implements OnInit {

  private modalRef: BsModalRef;
  isAddNew = false;
  passengers = [];
  vibEnglishRemark = [];
  vibFrenchRemark = [];
  amkRemark = [];


  @Input()
  segmentRemarks: PassiveSegmentsModel[] = [];
  // segmentView: SegmentsViewModel;

  constructor(private modalService: BsModalService, private utilHelper: UtilHelper, private pnrService: PnrService) {
    //
  }

  ngOnInit() {
    this.segmentRemarks = this.pnrService.getModelPassiveSegments();
    this.modalSubscribeOnClose();
  }

  addPassiveSegment() {
    this.isAddNew = true;
    const passiveSegment = new PassiveSegmentsModel();
    this.modalRef = this.modalService.show(UpdateSegmentComponent, { backdrop: 'static' });
    this.modalRef.content.title = 'Add Passive Segment';
    passiveSegment.segmentNo = (this.segmentRemarks.length + 1);
    passiveSegment.isNew = true;
    passiveSegment.noPeople = this.getNoPassengers();
    this.modalRef.content.passiveSegments = passiveSegment;

  }

  modalSubscribeOnClose() {
    this.modalService.onHide.subscribe(result => {
      if (this.modalRef !== undefined && this.modalRef.content.isSubmitted) {
        if (!this.isAddNew) {
          const segmentNo = this.segmentRemarks.find(x => x.segmentNo === this.modalRef.content.passiveSegments.segmentNo);
          this.utilHelper.modelCopy(this.modalRef.content.passiveSegments, segmentNo);
        } else {
          this.segmentRemarks.push(this.modalRef.content.passiveSegments);
        }
        this.modalRef.content.isSubmitted = false;
      }
    });
  }

  updateItem(r: PassiveSegmentsModel) {
    this.isAddNew = false;
    this.modalRef = this.modalService.show(UpdateSegmentComponent, { backdrop: 'static' });
    this.modalRef.content.title = 'Update Matrix Receipt';
    this.modalRef.content.matrixReceipt = new PassiveSegmentsModel();
    this.utilHelper.modelCopy(r, this.modalRef.content.passiveSegments);
    this.modalRef.content.onChangeSegmentType(r.segmentType);
    this.modalRef.content.onChangeStateRoom(r.stateRoom);
  }

  deleteItem(r: PassiveSegmentsModel) {
    if (confirm('Are you sure you want to delete this Segment?')) {
      this.segmentRemarks.splice(this.segmentRemarks.indexOf(r), 1);
      let i = 1;
      this.segmentRemarks.forEach(x => {
        x.segmentNo = i;
        i++;
      });
    }
  }

  getNoPassengers() {
    this.passengers = this.pnrService.getPassengers();
    return this.passengers.length.toString();
  }

  getVibEnglishRemark() {
    this.vibEnglishRemark = [
      'FOR VIA RAIL TRAVEL PLEASE CHECK IN AT TRAIN STATION',
      'AT LEAST 45 MINUTES PRIOR TO DEPARTURE.',
      'VIA RAIL POLICY-NONSMOKING ENVIRONMENT ON ALL TRAINS.',
      'VIA COUPONS ARE NOT VALID FOR AIR TRAVEL.',
      'IF CHANGES ARE MADE ENROUTE PLEASE ENSURE YOUR',
      'TICKET IS ENDORSED BY VIA 1 TICKET LOUNGE.',
      'PLEASE CALL VIA RAIL AT 1-888-842-7245 TO RECONFIRM YOUR',
      'TRAIN DEPARTURE/ARRIVAL TIMES.'
    ];
  }

  getVibFrenchRemark() {
    this.vibFrenchRemark = [
      'POUR LES DEPLACEMENTS A BORD DE VIA RAIL VEUILLEZ VOUS',
      'PRESENTER A LA GARE AU MOINS 45 MINUTES AVANT L HEURE PREVUE DE',
      'VOTRE DEPART SUIVANT LA POLITIQUE DE VIA RAIL-TOUS LES TRAINS SONT',
      'NON FUMEUR. LES COUPONS VIA RAIL NE PEUVENT ETRE UTILISES POUR',
      'DES DEPLACEMENTS AERIENS. SI VOUS DEVEZ MODIFIER VOTRE ITINERAIRE',
      'EN COURS DE ROUTE ASSUREZ-VOUS QUE VOTRE BILLET EST ENDOSSE PAR',
      'LA BILLETTERIE VIA 1.',
      'VEUILLEZ COMMUNIQUER AVEC VIA RAIL AU 1-888-842-7245 POUR RECONFIRMER',
      'LES HEURES DE DEPART/D ARRIVEE DE VOTRE TRAIN.'
    ];
  }

  getAmkRemark() {
    this.amkRemark = [
      'VALID IDENTIFICATION IS REQUIRED FOR ALL PASSENGERS 18 AND OVER.',
      'ALL AMTRAK TRAINS EXCEPT AUTO TRAIN ARE NON-SMOKING.',
      'TRAIN CHANGES ARE PERMITTED ANYTIME SUBJECT TO AVAILABILITY',
      'IF YOU NEED TO CHANGE OR CANCEL YOUR RESERVATION-',
      'REFUND/CHANGE FEES MAY APPLY',
      'RECOMMENDED ARRIVAL TIME AT THE STATION AT LEAST 30 MINUTES',
      'PRIOR TO YOUR SCHEDULES DEPARTURE.',
      'ALLOW ADDITIONAL TIME IF YOU NEED HELP WITH BAGGAGE OR TICKETS.',
      'IF YOU ARE TRAVELLING ON THE AUTO TRAIN YOU MUST CHECK IN AT LEAST',
      '2 HOURS BEFORE SCHEDULED DEPARTURE.',
      'THIS CONFIRMATION NOTICE IS NOT A TICKET',
      'YOU MUST OBTAIN YOUR TICKET BEFORE BOARDING ANY TRAIN.',
      'THIS CONFIRMATION WILL NOT BE ACCEPTED ONBOARD.',
      'YOUR ENTIRE RESERVATION -ALL SEGMENTS- WILL BE CANCELLED',
      'IF YOU DO NOT PICK UP YOUR TICKET BEFORE YOUR FIRST DEPARTURE OR',
      'IF YOU NO-SHOW FOR ANY SEGMENT IN YOUR RESERVATION.',
      'IF YOUR RESERVATION CANCELS YOU WILL NEED TO MAKE NEW RESERVATIONS',
      'WHICH MAY BE AT A HIGHER FARE.'
    ];
  }

}
