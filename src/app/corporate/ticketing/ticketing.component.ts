import { Component, OnInit, ViewChild } from '@angular/core';
import { AquaTicketingComponent } from './aqua-ticketing/aqua-ticketing.component';
import { UtilHelper } from 'src/app/helper/util.helper';
import { TicketingLineComponent } from './ticketing-line/ticketing-line.component';


@Component({
    selector: 'app-ticketing',
    templateUrl: './ticketing.component.html',
    styleUrls: ['./ticketing.component.scss']
})
export class TicketingComponent implements OnInit {

    @ViewChild(AquaTicketingComponent) aquaTicketingComponent: AquaTicketingComponent;
    @ViewChild(TicketingLineComponent) ticketlineComponent: TicketingLineComponent;

    constructor(private utilHelper: UtilHelper) { }

    ngOnInit() {
    }

    checkValid() {
        if (this.aquaTicketingComponent !== undefined) {
            this.utilHelper.validateAllFields(this.aquaTicketingComponent.aquaTicketingFormGroup);
            if (!this.aquaTicketingComponent.aquaTicketingFormGroup.valid) {
                return false;
            }
        }

        this.utilHelper.validateAllFields(this.ticketlineComponent.ticketForm);
        if (!this.ticketlineComponent.ticketForm.valid) {
            return false;
        }
        return true;
    }
}
