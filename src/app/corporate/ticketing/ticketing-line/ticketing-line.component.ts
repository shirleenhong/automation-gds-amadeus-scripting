import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { SelectItem } from 'src/app/models/select-item.model';
import { StaticValuesService } from 'src/app/service/static-values.services';
import { PnrService } from 'src/app/service/pnr.service';
import { UtilHelper } from 'src/app/helper/util.helper';
import { TicketModel } from 'src/app/models/pnr/ticket.model';
import { ApprovalRuleService } from 'src/app/service/corporate/approval-rule.service';
import { ApprovalItem } from 'src/app/models/ddb/approval.model';
import { ValueChangeListener } from 'src/app/service/value-change-listener.service';
import { RulesEngineService } from 'src/app/service/business-rules/rules-engine.service';

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
  hasApproval = false;
  hasRuleApproval = false;
  approvalForm: FormGroup;
  ruleForm: FormGroup;
  primaryReasonList: Array<ApprovalItem> = [];
  secondaryReasonList: Array<ApprovalItem> = [];
  additionalReasonList: Array<ApprovalItem> = [];
  @Input() containerFilter: string;

  constructor(
    private staticValues: StaticValuesService,
    private pnrService: PnrService,
    private utilHelper: UtilHelper,
    private approvalRuleService: ApprovalRuleService,
    private valueChangeListener: ValueChangeListener,
    private ruleEngine: RulesEngineService
  ) {
    this.ticketForm = new FormGroup({
      officeId: new FormControl('', [Validators.required]),
      ticketDate: new FormControl('', [Validators.required]),
      pnrOnHold: new FormControl('', []),
      tk: new FormControl('', [Validators.required]),
      verifyAck: new FormControl('', [Validators.required])
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
    this.loadApproval([]);
    this.valueChangeListener.reasonCodeOnChange.subscribe((reasonCodes) => {
      if (reasonCodes.length > 0) {
        this.loadApproval(reasonCodes);
      }
    });
  }

  loadApproval(reasonCodes) {
    this.hasApproval = this.approvalRuleService.hasApproval(reasonCodes);
    this.approvalForm = new FormGroup({
      noApproval: new FormControl(!this.hasApproval, [Validators.required]),
      primaryReason: new FormControl('', [Validators.required]),
      secondaryReason: new FormControl('', [Validators.required]),
      primaryText: new FormControl(''),
      secondaryText: new FormControl(''),
      additionalValues: new FormArray([])
    });
    this.noApprovalChecked(!this.hasApproval);
    this.disableApprovalControls();
    if (this.hasApproval) {
      this.hasRuleApproval = this.ruleEngine.checkRuleResultExist('UI_DISPLAY_CONTAINER', 'APPROVAL');
    }
  }

  /**
   * Presets the extracted office ID to the OID field.
   */
  private loadOid(): void {
    const extractedOid = this.pnrService.extractOidFromBookRemark();
    this.ticketForm.get('officeId').setValue(extractedOid);
    this.oidDisplay = extractedOid;
  }

  /**
   * Extracts office ID from remarks.
   */

  private loadDefaultDate() {
    const dateToday = this.DATE_PIPE.transform(new Date(), 'yyyy-MM-dd');
    this.ticketForm.get('ticketDate').setValue(dateToday);
  }

  /**
   * Gets the static list of options to display for TK dropdown.
   */
  private loadTKList(): void {
    this.tkList = this.staticValues.getTKList();
    if (this.containerFilter === 'FULLWRAP') {
      this.tkList.splice(4, 2);
    }
  }

  /**
   * Checks the segments in order to set a default value for TK dropdown.
   */
  private checkSegments(): void {
    let presetDone = this.presetSegmentFee();

    if (!presetDone) {
      presetDone = this.presetSegmentCancelled();
    }

    // if (!presetDone) {
    //   presetDone = this.presetSegmentByChargeFee();
    // }

    if (!presetDone) {
      this.presetSegmentByIssueTix();
    }
  }

  /**
   * Presets the TK dropdown to "FEE ONLY".
   * @returns A flag indicator if a match was found, therefore presetting a value.
   */
  private presetSegmentFee(): boolean {
    const segmentDetails = this.pnrService.getSegmentList();
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
  // private presetSegmentByChargeFee(): boolean {
  //   let hasChargingMatch = false;
  //   const cfLine = this.pnrService.getCFLine();

  //   if (cfLine) {
  //     const cfaChargingFees = this.staticValues.getCfaChargingFees();

  //     for (const cfaChargingFee of cfaChargingFees) {
  //       if (cfaChargingFee.cfa === cfLine.cfa) {
  //         hasChargingMatch = true;
  //         break;
  //       }
  //     }

  //     if (hasChargingMatch) {
  //       this.updateTkDropdown('INV');
  //     } else {
  //       hasChargingMatch = false;
  //       this.updateTkDropdown('CHG');
  //     }
  //   }

  //   return hasChargingMatch;
  // }

  /**
   * Presets the TK dropdown to "ISSUE E-TICKET OR NON BSP TICKET" if all conditions/checkings
   * before this did not satisfy.
   */
  private presetSegmentByIssueTix(): void {
    this.updateTkDropdown('');
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
   * @param selectedRule selected rule keyword from UI sample UI_SECPONDARY_1
   */

  showAdditionalInfo(selectedIndex) {
    if (selectedIndex === null) {
      return;
    }
    let selectedRule: ApprovalItem = null;
    if (this.secondaryReasonList.length > 0) {
      selectedRule = this.secondaryReasonList[selectedIndex];
      this.approvalForm.get('secondaryText').setValue(selectedRule.getRuleValueText());
    } else {
      selectedRule = this.primaryReasonList[selectedIndex];
      this.approvalForm.get('primaryText').setValue(selectedRule.getRuleValueText());
    }

    const id = selectedRule.approvalType.match(/_(\d)/g).join('') + (selectedRule.approvalType.indexOf('PRIMARY') >= 0 ? '_0' : '');
    (this.approvalForm.get('additionalValues') as FormArray).controls = [];

    this.additionalReasonList
      .filter((x) => x.approvalType.indexOf('UI_ADDITIONAL' + id) >= 0)
      .sort((a, b) => (a.approvalRules > b.approvalRules ? 1 : -1))
      .forEach((app) => {
        const type = this.getAdditionalUiType(app);
        (this.approvalForm.get('additionalValues') as FormArray).push(
          new FormGroup({
            textLabel: new FormControl(app.getRuleValueText()),
            textValue: new FormControl('', type === '[TEXTBOX]' ? [Validators.required] : null),
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
    if (app.getRuleKeywords().length === 0) {
      return '';
    }
    return app.getRuleKeywords()[0];
  }

  /**
   * create additional form values based on selected rule
   * @param selectedRule selected rule keyword from UI sample UI_SECPONDARY_1
   */
  primaryReasonChange(selectedIndex) {
    if (selectedIndex && selectedIndex >= 0) {
      const selectedRule = this.primaryReasonList[selectedIndex];
      this.approvalForm.get('primaryText').setValue(selectedRule.getRuleValueText());
      const index = selectedRule.approvalType.match(/_(\d)/g).join('');
      this.secondaryReasonList = this.approvalRuleService.getSecondaryApprovalList(index);
      if (this.secondaryReasonList.length > 0) {
        this.approvalForm.get('secondaryReason').enable();
      } else {
        this.approvalForm.controls.secondaryReason.clearValidators();
        this.approvalForm.get('secondaryReason').updateValueAndValidity();
        this.showAdditionalInfo(selectedIndex);
      }
    } else {
      this.approvalForm.get('secondaryReason').setValue(null);
    }
  }

  /**
   * apply if No Approval Checkbox is changed
   * @param checked boolean
   */
  noApprovalChecked(checked) {
    if (checked) {
      this.approvalForm.get('primaryReason').setValue(null);
      this.approvalForm.get('primaryReason').disable();
      this.approvalForm.get('secondaryReason').setValue(null);
      this.approvalForm.get('secondaryReason').disable();
    } else if (this.primaryReasonList.length > 0) {
      this.approvalForm.get('primaryReason').enable();
      this.primaryReasonChange(null);
    }
  }

  /**
   * apply has approval but no UI setup in API
   */
  disableApprovalControls() {
    if (this.primaryReasonList.length === 0) {
      this.approvalForm.get('primaryReason').setValue('');
      this.approvalForm.get('primaryReason').disable();
    }
    if (this.secondaryReasonList.length === 0) {
      this.approvalForm.get('secondaryReason').setValue('');
      this.approvalForm.get('secondaryReason').disable();
    }
  }
}
