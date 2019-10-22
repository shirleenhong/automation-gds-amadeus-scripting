import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { PnrService } from '../../../service/pnr.service';

@Component({
    selector: 'app-add-contact',
    templateUrl: './add-contact.component.html',
    styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
    addContactForm: FormGroup;
  items: FormArray;
  paxArray = [];
    constructor(private fb: FormBuilder,private pnrService:PnrService) {
     
    }
  ngOnInit() {
    this.getPassengers();
    const arrayGroup = this.getSSRPreFilledValues();
    arrayGroup.push(this.createItem);
    this.addContactForm = new FormGroup({
      items: this.fb.array(arrayGroup)
    });
   
   
  }
  
  getPassengers() {
    const passengers = this.pnrService.pnrObj.nameElements;
    for (const pax of passengers) {
      let temp = {
        tatooNumber: pax.tatooNumber,
        segmentType: pax.segmentType,
        paxValue:"P"+pax.elementNumber
      }
      this.paxArray.push(temp);
    }
  }
  
    createItem(): FormGroup {
      const group = this.fb.group({
        name: new FormControl('', []),
        countryCode: new FormControl('', []),
        phone: new FormControl('', []),
        freeFlowText: new FormControl('', []),
        passengers: new FormControl('', [])
      });
      return group;
    }
  
    addItem(): void {
      this.items = this.addContactForm.get('items') as FormArray;
      if (this.items.length < 4) {
        this.items.push(this.createItem());
      }
    }
  
    removeInputField(i: number): void {
      const control = this.items;
      control.removeAt(i);
    }

  getSSRPreFilledValues() {
    let ssrElements = this.pnrService.pnrObj.ssrElements;
    ssrElements = ssrElements.filter(x => { if (x.fullNode.serviceRequest.ssr.type === 'PCTC') { return x; } });
    const groupArray = [];
    for (const sr of ssrElements) {
      const freeFlowText = sr.freeFlowText;
      const reg = /([A-Z\s]{1,})\s(\/)([A-Z]{2}[0-9]{1,})(.)\s([A-Z-.\s]{1,})/g;
      const matchedGroups = reg.exec(freeFlowText);
      const association = this.getPaxAssociations(sr.associations);
      const group = this.fb.group({
        name: new FormControl(matchedGroups[1], []),
        countryCode: new FormControl(matchedGroups[3].substring(0,2), []),
        phone: new FormControl(matchedGroups[3].substring(2,matchedGroups[3].length-1), []),
        freeFlowText: new FormControl(matchedGroups[5], []),
        passengers: new FormControl(association, [])
      });
      groupArray.push(group);
    
    }
    return groupArray;

  }
  
  getPaxAssociations(associations) {
    if (associations) {
      for (const a of associations) {
        for (const p of this.pnrService.pnrObj.nameElements) {
          if (a.tatooNumber === p.tatooNumber && a.segmentType===p.segmentType) {
            return "P" + p.elementNumber;
         }
       }
      }
    }

  }
    
    
}
    