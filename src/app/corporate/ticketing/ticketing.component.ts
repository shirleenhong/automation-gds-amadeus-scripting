import { Component, OnInit } from '@angular/core';
import { StaticValuesService } from '../../service/static-values.services';
import { SelectItem } from 'src/app/models/select-item.model';

@Component({
    selector: 'app-ticketing',
    templateUrl: './ticketing.component.html',
    styleUrls: ['./ticketing.component.scss']
})
export class TicketingComponent implements OnInit {

    tkList: Array<SelectItem> = null;

    constructor(private staticValues: StaticValuesService) { }

    ngOnInit() {
        this.loadTKList();
    }

    loadTKList() {
        this.tkList = this.staticValues.getTKList();
    }
}
