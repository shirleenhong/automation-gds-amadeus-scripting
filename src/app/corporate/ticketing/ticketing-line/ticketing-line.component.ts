import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SelectItem } from 'src/app/models/select-item.model';
import { StaticValuesService } from 'src/app/service/static-values.services';
import { PnrService } from 'src/app/service/pnr.service';
import { UtilHelper } from 'src/app/helper/util.helper';
import { TicketModel } from 'src/app/models/pnr/ticket.model';

@Component({
  selector: 'app-ticketing-line',
  templateUrl: './ticketing-line.component.html',
  styleUrls: ['./ticketing-line.component.scss']
})
export class TicketingLineComponent implements OnInit {

  DATE_PIPE = new DatePipe('en-US');
  oidDisplay: string;
  isOnHoldChecked: boolean = false;
  ticketForm: FormGroup;
  tkList: Array<SelectItem> = null;

  constructor(private staticValues: StaticValuesService,
    private pnrService: PnrService,
    private utilHelper: UtilHelper) {
    this.ticketForm = new FormGroup({
      officeId: new FormControl('', [Validators.required]),
      ticketDate: new FormControl('', [Validators.required]),
      pnrOnHold: new FormControl('', []),
      tk: new FormControl('', [Validators.required]),
      verifyAck: new FormControl('', [Validators.required]),
    });

  }

  ngOnInit() {
    this.loadOid();
    this.loadDefaultDate();
    this.loadTKList();
    this.checkSegments();

    this.checkValid();
  }

  /**
   * Presets the extracted office ID to the OID field.
   */
  private loadOid(): void {
    const extractedOid = this.extractOidFromBookRemark();
    this.ticketForm.get('officeId').setValue(extractedOid);
    this.oidDisplay = extractedOid;
  }

  /**
   * Extracts office ID from remarks.
   */
  private extractOidFromBookRemark(): string {
    // const remarks = this.pnrService.getRemarksFromGDSByRegex(/BOOK-/g);
    const BOOK_REMARK_PREFIX = 'BOOK-';
    const TKT_PREFIX = 'TKT-';

    const remarks = this.pnrService.getRemarkText(BOOK_REMARK_PREFIX);
    let oid = null;

    const remarkSplitted: Array<string> = remarks.split('/');
    for (let i = 0; i < remarkSplitted.length; i++) {
      let ctrRemarkSplit = remarkSplitted[i];
      if (ctrRemarkSplit.match(TKT_PREFIX)) {
        oid = ctrRemarkSplit.replace(TKT_PREFIX, '');
        break;
      }
    }

    return oid;
  }

  private loadDefaultDate() {
    const dateToday = this.DATE_PIPE.transform(new Date(), 'yyyy-MM-dd');
    this.ticketForm.get('ticketDate').setValue(dateToday);
  }

  /**
   * Gets the static list of options to display for TK dropdown.
   */
  private loadTKList(): void {
    this.tkList = this.staticValues.getTKList();
  }

  /**
   * Checks the segments in order to set a default value for TK dropdown.
   */
  private checkSegments(): void {
    let presetDone: Boolean = this.presetSegmentFee();

    if (!presetDone) {
      presetDone = this.presetSegmentCancelled();
    }

    if (!presetDone) {
      presetDone = this.presetSegmentByChargeFee();
    }

    if (null === presetDone) {
      this.presetSegmentByIssueTix();
    }
  }

  /**
   * Presets the TK dropdown to "FEE ONLY".
   * @returns A flag indicator if a match was found, therefore presetting a value.
   */
  private presetSegmentFee(): Boolean {
    const segmentDetails = this.pnrService.getSegmentTatooNumber();
    let hasSegmentMatch = false;

    segmentDetails.forEach((segments) => {
      let segmentText = segments.freetext;
      hasSegmentMatch = segmentText.includes('TYP-CWT/FEE ONLY');

      if (hasSegmentMatch) {
        this.updateTkDropdown('FEE');
      }
    });

    return hasSegmentMatch;
  }

  /**
   * Presets the TK dropdown to "PNR CANCELLED".
   * @returns A flag indicator if a match was found, therefore presetting a value.
   */
  private presetSegmentCancelled(): Boolean {
    const misIndex = this.pnrService.getmisCancel();
    const hasSegmentMatch = misIndex > 0;

    if (hasSegmentMatch) {
      this.updateTkDropdown('CXL');
    }

    return hasSegmentMatch;
  }

  /**
   * Presets the TK dropdown to "INVOICE HOTEL ONLY/CAR ONLY/LIMO ONLY" if there is a matched
   * CFA Charging fee, else presets to "CHANGED PNR-AFTER TICKETING/UPDATE MATRIX-NO FEE".
   */
  private presetSegmentByChargeFee(): Boolean {
    let hasChargingMatch: Boolean = null;
    const cfLine = this.pnrService.getCFLine();

    if (cfLine) {
      const cfaChargingFees = this.staticValues.getCfaChargingFees();

      for (let i = 0; i < cfaChargingFees.length; i++) {
        if (cfaChargingFees[i].cfa === cfLine.cfa) {
          hasChargingMatch = true;
          break;
        }
      }

      if (hasChargingMatch) {
        this.updateTkDropdown('INV');
      } else {
        hasChargingMatch = false;
        this.updateTkDropdown('CHG');
      }
    }

    return hasChargingMatch;
  }

  /**
   * Presets the TK dropdown to "ISSUE E-TICKET OR NON BSP TICKET" if all conditions/checkings
   * before this did not satisfy.
   */
  private presetSegmentByIssueTix(): void {
    this.updateTkDropdown('ISS');
  }

  /**
   * Updates the TK dropdown to a new value.
   * @param newValue The new value to set.
   */
  private updateTkDropdown(newValue: string): void {
    this.ticketForm.get('tk').setValue(newValue);
  }

  public getTicketingDetails(): TicketModel {
    const ticketRemark = new TicketModel();
    ticketRemark.oid = this.ticketForm.get('officeId').value;
    ticketRemark.tktDate = this.ticketForm.get('ticketDate').value;
    ticketRemark.pnrOnHold = this.ticketForm.get('pnrOnHold').value;
    ticketRemark.tkLine = this.ticketForm.get('tk').value;

    return ticketRemark;
  }

  /**
   * When ON HOLD checkbox is ticked, the TK dropdown is set to empty and disabled.
   */
  public onChangePnrOnHold(): void {
    this.isOnHoldChecked = this.ticketForm.get('pnrOnHold').value;
    const tkDropdown = this.ticketForm.get('tk');

    if (this.isOnHoldChecked) {
      this.updateTkDropdown('');
      tkDropdown.disable();
    } else {
      tkDropdown.enable();
    }
  }

  /**
   * Method to check ticketing form validation.
   */
  public checkValid() {
    this.utilHelper.validateAllFields(this.ticketForm);
    if (!this.ticketForm.valid) {
      return false;
    }

    return true;
  }

}
