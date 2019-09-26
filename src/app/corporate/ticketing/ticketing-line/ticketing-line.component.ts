import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { SelectItem } from 'src/app/models/select-item.model';
import { StaticValuesService } from 'src/app/service/static-values.services';
import { PnrService } from 'src/app/service/pnr.service';
import { UtilHelper } from 'src/app/helper/util.helper';
import { TicketModel } from 'src/app/models/pnr/ticket.model';
import { ApprovalRuleService } from 'src/app/service/corporate/approval-rule.service';
import { ApprovalItem } from 'src/app/models/ddb/approval.model';

@Component({
  selector: 'app-ticketing-line',
  templateUrl: './ticketing-line.component.html',
  styleUrls: ['./ticketing-line.component.scss']
})
export class TicketingLineComponent implements OnInit {
  DATE_PIPE = new DatePipe('en-US');
  oidDisplay: string;
  isOnHoldChecked = false;
  ticketForm: FormGroup;
  tkList: Array<SelectItem> = null;
  hasApproval = true;
  approvalForm: FormGroup;
  primaryReasonList: Array<ApprovalItem> = [];
  secondaryReasonList: Array<ApprovalItem> = [];
  additionalReasonList: Array<ApprovalItem> = [];
  constructor(
    private staticValues: StaticValuesService,
    private pnrService: PnrService,
    private utilHelper: UtilHelper,
    private approvalRuleService: ApprovalRuleService
  ) {
    this.ticketForm = new FormGroup({
      officeId: new FormControl('', [Validators.required]),
      ticketDate: new FormControl('', [Validators.required]),
      pnrOnHold: new FormControl('', []),
      tk: new FormControl('', [Validators.required]),
      verifyAck: new FormControl('', [Validators.required])
    });

    this.approvalForm = new FormGroup({
      noApproval: new FormControl(false, [Validators.required]),
      primaryReason: new FormControl('', [Validators.required]),
      secondaryReason: new FormControl('', [Validators.required]),
      additionalValues: new FormArray([])
    });
  }

  ngOnInit() {
    this.loadOid();
    this.loadDefaultDate();
    this.loadTKList();
    this.checkSegments();
    this.checkValid();
    this.primaryReasonList = this.approvalRuleService.getPrimaryApprovalList();
    this.secondaryReasonList = this.approvalRuleService.getSecondaryApprovalList();
    this.additionalReasonList = this.approvalRuleService.getAdditionalList();
    this.hasApproval = this.approvalRuleService.hasApproval();
    this.approvalForm.get('noApproval').setValue(this.hasApproval);
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
    for (const ctrRemarkSplit of remarkSplitted) {
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
    let presetDone = this.presetSegmentFee();

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
  private presetSegmentFee(): boolean {
    const segmentDetails = this.pnrService.getSegmentTatooNumber();
    let hasSegmentMatch = false;

    segmentDetails.forEach((segments) => {
      const segmentText = segments.freetext;
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
  private presetSegmentCancelled(): boolean {
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
  private presetSegmentByChargeFee(): boolean {
    let hasChargingMatch = false;
    const cfLine = this.pnrService.getCFLine();

    if (cfLine) {
      const cfaChargingFees = this.staticValues.getCfaChargingFees();

      for (const cfaChargingFee of cfaChargingFees) {
        if (cfaChargingFee.cfa === cfLine.cfa) {
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

  /**
   * APPROVAL
   */

  /**
   * create additional form values based on selected rule
   * @param selectedRule selected rule keyword from UI sample [UI_SECPONDARY_1]
   */
  showAdditionalInfo(selectedRule) {
    if (!selectedRule) {
      return;
    }

    const id = selectedRule.match(/_(\d)/g).join('');
    (this.approvalForm.get('additionalValues') as FormArray).controls = [];

    this.additionalReasonList
      .filter((x) => x.approvalRules.indexOf('[UI_ADDITIONAL' + id) >= 0)
      .forEach((app) => {
        const type = this.getAdditionalUiType(app);
        (this.approvalForm.get('additionalValues') as FormArray).push(
          new FormGroup({
            textLabel: new FormControl(app.getRuleValueText()),
            textValue: new FormControl('', type === '[TEXT_BOX]' ? [Validators.required] : null),
            uiType: new FormControl(type)
          })
        );
      });

    // this.approvalForm.get('additionalValues').setValue(frmArray);
  }

  /**
   * Extract the UI type wether UI should be displaye as Textbox or Label
   * @param app ApprovalItem
   */
  getAdditionalUiType(app: ApprovalItem) {
    if (app.getRuleKeywords().length < 1) {
      return '';
    }
    return app.getRuleKeywords()[1];
  }

  /**
   * create additional form values based on selected rule
   * @param selectedRule selected rule keyword from UI sample [UI_SECPONDARY_1]
   */
  primaryReasonChange(selectedRule) {
    this.secondaryReasonList = this.approvalRuleService.getSecondaryApprovalList(selectedRule.match(/_(\d)/g).join(''));
    if (this.secondaryReasonList.length > 0) {
      this.approvalForm.get('secondaryReason').enable();
    } else {
      this.approvalForm.controls.secondaryReason.clearValidators();
      this.approvalForm.get('secondaryReason').updateValueAndValidity();
      this.showAdditionalInfo(selectedRule);
    }
  }

  /**
   * apply if No Approval Checkbox is changed
   * @param checked boolean
   */
  noApprovalChecked(checked) {
    if (checked) {
      this.approvalForm.get('primaryReason').setValue('');
      this.approvalForm.get('primaryReason').disable();
      this.approvalForm.get('secondaryReason').setValue('');
      this.approvalForm.get('secondaryReason').disable();
    } else {
      this.approvalForm.get('primaryReason').enable();
      this.primaryReasonChange('');
    }
  }
}
