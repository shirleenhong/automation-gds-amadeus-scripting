import { Component, OnInit } from '@angular/core';
import { PnrService } from '../../../service/pnr.service';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-exchange-endorsements',
  templateUrl: './exchange-endorsements.component.html',
  styleUrls: ['./exchange-endorsements.component.scss']
})
export class ExchangeEndorsementsComponent implements OnInit {
    exchangeAirlines: { itemText: string; itemValue: string; }[];
    exchangeSegments: string[];
    exchangeEndorsementsForm = this.fb.group({});
    constructor(private pnrService: PnrService, private fb: FormBuilder){}
  ngOnInit() {
      this.loadStaticValues();
      this.exchangeSegments = this.pnrService.getExchangeSegmentNumbers();
     }
    loadStaticValues() {
        this.exchangeAirlines = [
            { itemText: 'Air Canada Schedule Change', itemValue: 'airCanada' },
            { itemText: 'Austrian Airlines Involuntary Schedule Change', itemValue: 'ausAirlines' },
            { itemText: 'Brussels Airlines Involuntary Schedule Change', itemValue: 'brusAirlines' },
            { itemText: 'Lufthansa Airlines Involuntary Schedule Change', itemValue: 'lufthAirlines' },
            { itemText: 'United Airlines Waiver Code Required for Schedule Change/IRROP/Market Withdrawal', itemValue: 'unitedAirlines' }
          ];
    }

}
