import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StaticValuesService } from '../../service/static-values.services';
import { PnrService } from '../../service/pnr.service';
import { SelectItem } from 'src/app/models/select-item.model';
import { TicketModel } from 'src/app/models/pnr/ticket.model';

@Component({
    selector: 'app-ticketing',
    templateUrl: './ticketing.component.html',
    styleUrls: ['./ticketing.component.scss']
})
export class TicketingComponent implements OnInit {

    oidDisplay: string;
    isOnHoldChecked: boolean = false;
    ticketForm: FormGroup;
    tkList: Array<SelectItem> = null;

    constructor(private staticValues: StaticValuesService, private pnrService: PnrService) {
        this.ticketForm = new FormGroup({
            officeId: new FormControl('', [Validators.required]),
            ticketDate: new FormControl('', [Validators.required]),
            pnrOnHold: new FormControl('', []),
            tk: new FormControl('', [Validators.required])
        });

    }

    ngOnInit() {
        this.loadOid();
        this.loadTKList();
        this.checkSegments();
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
        this.presetSegmentFee();
        this.presetSegmentCancelled();
        this.presetSegmentByChargeFee();
    }

    /**
     * Presets the TK dropdown to "FEE ONLY".
     */
    private presetSegmentFee(): void {
        const segmentDetails = this.pnrService.getSegmentTatooNumber();
        segmentDetails.forEach((segments) => {
            let segmentText = segments.freetext;
            let hasSegmentMatch = segmentText.includes('TYP-CWT/FEE ONLY');

            if (hasSegmentMatch) {
                this.updateTkDropdown('FEE');
            }
        });
    }

    /**
     * Presets the TK dropdown to "PNR CANCELLED".
     */
    private presetSegmentCancelled(): void {
        const misIndex = this.pnrService.getmisCancel();
        const hasSegmentMatch = misIndex > 0;

        if (hasSegmentMatch) {
            this.updateTkDropdown('CXL');
        }
    }

    /**
     * Presets the TK dropdown to "INVOICE HOTEL ONLY/CAR ONLY/LIMO ONLY" if there is a matched
     * CFA Charging fee, else presets to "CHANGED PNR-AFTER TICKETING/UPDATE MATRIX-NO FEE".
     */
    private presetSegmentByChargeFee(): void {
        const cfLine = this.pnrService.getCFLine();
        const cfaChargingFees = this.staticValues.getCfaChargingFees();
        let hasChargingMatch = false;

        for (let i = 0; i < cfaChargingFees.length; i++) {
            if (cfaChargingFees[i].cfa === cfLine.cfa) {
                hasChargingMatch = true;
                break;
            }
        }

        if (hasChargingMatch) {
            this.updateTkDropdown('INV');
        } else {
            this.updateTkDropdown('CHG');
        }
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
}
