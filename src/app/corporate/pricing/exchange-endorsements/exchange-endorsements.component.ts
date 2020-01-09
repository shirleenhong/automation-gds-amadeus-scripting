import { Component, OnInit } from '@angular/core';
import { PnrService } from '../../../service/pnr.service';
import { FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-exchange-endorsements',
  templateUrl: './exchange-endorsements.component.html',
  styleUrls: ['./exchange-endorsements.component.scss']
})
export class ExchangeEndorsementsComponent implements OnInit {
  isShowSC = true;
  uaExchangeList: { itemText: string; itemValue: string; }[];
  exchangeEndorsementsForm = this.fb.group({
    exchangeTickets: this.fb.array([])
  });

  constructor(private pnrService: PnrService, private fb: FormBuilder) { }

  ngOnInit() {
    this.loadStaticValues();
    this.checkForexchangeTickets();
  }

  loadStaticValues() {
    this.uaExchangeList = [
      { itemText: 'UASKEDCHG-SCHEDULE CHANGE', itemValue: 'UASKEDCHG' },
      { itemText: 'UAIRROPS DELAY-FLTS IMPACTED BY IRREGULAR OPERATIONS', itemValue: 'UAIRROPSDELAY' },
      { itemText: 'UAIRROPS CANCEL-FLTS IMPACTED BY IRREGULAR OPERATIONS', itemValue: 'UAIRROPSCANCEL' },
      { itemText: 'UAMKW-MARKET WITHDRAWAL', itemValue: 'UAMKW' },
      { itemText: 'OASKEDCHG-OTHER AIRLINE SCHEDULE CHANGE', itemValue: 'OASKEDCHG' }
    ];
  }

  checkForexchangeTickets() {
    const exhange = this.pnrService.getExchangeList();
    const segments = this.pnrService.getSegmentList();
    const feList = this.pnrService.getFEList();

    exhange.forEach(tkt => {
      let airline = '';
      let lineNo = '';
      tkt.segmentAssociation.forEach(segmentassoc => {
        const look = segments.find((x) => x.tatooNo === segmentassoc);
        airline = look.airlineCode;
      });

      tkt.segmentAssociation.forEach(segmentassoc => {
        const look = feList.find((x) => x.segments.indexOf(segmentassoc) > -1);
        lineNo = look.lineNo;
      });

      this.addExchangeList(tkt.exchangeNo, airline, lineNo);
    });
  }

  addExchangeList(tktNo, airline, lineNo) {
    const items = this.exchangeEndorsementsForm.get('exchangeTickets') as FormArray;
    items.push(this.createEndorsementGroup(tktNo, airline, lineNo));
  }

  createEndorsementGroup(ticketNo, airline, lineNo) {
    const serviceFund = new Map<string, string>();

    const formGroup = this.fb.group({
      // chkIncluded: new FormControl(''),
      lineNo: new FormControl(lineNo),
      ticketNo: new FormControl(ticketNo),
      airline: new FormControl(airline),
      endorsementlabel: new FormControl(),
      uaEndorsement: new FormControl(),
      exchangeEndorsement: new FormControl(),
      uaList: new FormControl(),
      exchangeServiceFund: new FormControl(),
      exchangeServiceValue: new FormControl(),
      scFlight: new FormControl(),
      scDate: new FormControl()
    });
    formGroup.get('ticketNo').setValue(ticketNo);
    formGroup.get('airline').setValue(airline);
    this.getServiceFund(serviceFund);
    this.assignEndorsementText(formGroup, airline, serviceFund);
    return formGroup;
  }

  private getServiceFund(serviceFund: Map<string, string>) {
    for (const rm of this.pnrService.pnrObj.rmElements) {
      const regex = /SERVICE FUNDS-(?<airline>([A-Z]{2}))-(?<fundNo>(.*))/g;
      const match = regex.exec(rm.freeFlowText);
      if (match !== null) {
        if (!serviceFund.has(match.groups.airline)) {
          serviceFund.set(match.groups.airline, match.groups.fundNo);
        }
      }
    }
  }

  private assignEndorsementText(formGroup, airline, serviceFund) {
    let airlineEndorsement = '';
    let airlineServiceFund = '';
    switch (airline) {
      case 'AC':
        airlineEndorsement = 'Air Canada Schedule Change';
        airlineServiceFund = serviceFund.get('AC');
        formGroup.get('scDate').disable();
        formGroup.get('scFlight').disable();
        break;
      case 'OS':
        airlineEndorsement = 'Austrian Airlines Involuntary Schedule Change';
        airlineServiceFund = serviceFund.get('OS');
        break;
      case 'SN':
        airlineEndorsement = 'Brussels Airlines Involuntary Schedule Change';
        airlineServiceFund = serviceFund.get('SN');
        break;
      case 'LH':
        airlineEndorsement = 'Lufthansa Airlines Involuntary Schedule Change';
        airlineServiceFund = serviceFund.get('LH');
        break;
    }

    formGroup.get('endorsementlabel').setValue(airlineEndorsement);
    formGroup.get('exchangeServiceValue').setValue(airlineServiceFund);
    formGroup.get('exchangeServiceValue').disable();

    if (!serviceFund.has(airline)) {
      formGroup.get('exchangeServiceFund').disable();
    }
  }

  showSC(group) {
    if (group.get('uaEndorsement').value === 'UAMKW') {
      group.get('scDate').setValue('');
      group.get('scFlight').setValue('');
      group.get('scDate').disable();
      group.get('scFlight').disable();
    } else {
      group.get('scDate').enable();
      group.get('scFlight').enable();
    }
  }

  checkServiceChange(group) {
    if (group.get('exchangeServiceFund').value === true) {
      if (group.get('airline').value === 'UA') {
        group.get('exchangeServiceValue').enable('');
        group.get('exchangeServiceValue').setValidators([Validators.required]);
      }
    } else {
      group.get('exchangeServiceValue').disable();
    }
  }
}
