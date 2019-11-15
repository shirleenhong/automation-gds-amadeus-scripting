import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { PnrService } from '../../../service/pnr.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
  addContactForm: FormGroup;
  items: FormArray;
  deleteSRline = [];
  paxArray = [];
  arrayGroup = [];
  showComponent = false;
  constructor(private fb: FormBuilder, private pnrService: PnrService) {}
  ngOnInit() {
    this.getPassengers();
    this.arrayGroup = this.getSSRPreFilledValues();
    if (this.arrayGroup.length > 0) {
      this.showComponent = this.arrayGroup.length > 0 ? true : this.showComponent;
      this.arrayGroup.push(this.createItem());
      this.addContactForm = new FormGroup({
        items: this.fb.array(this.arrayGroup)
      });
      this.items = this.addContactForm.get('items') as FormArray;
    }
  }

  getPassengers() {
    const passengers = this.pnrService.pnrObj.nameElements;
    for (const pax of passengers) {
      const temp = {
        tatooNumber: pax.tatooNumber,
        segmentType: pax.segmentType,
        paxValue: 'P' + pax.elementNumber
      };
      this.paxArray.push(temp);
    }
  }

  createItem(): FormGroup {
    const group = this.fb.group({
      name: new FormControl('', [Validators.required]),
      countryCode: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
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
    this.showComponent = i === 0 && this.items.length === 0 ? false : this.showComponent;
  }

  getSSRPreFilledValues() {
    let ssrElements = this.pnrService.pnrObj.ssrElements;
    ssrElements = ssrElements.filter((x) => {
      if (x.fullNode.serviceRequest.ssr.type === 'PCTC') {
        return x;
      }
    });
    this.getDeleteSSRElements(ssrElements);
    const groupArray = [];
    const valuesArr = [];
    for (const sr of ssrElements) {
      const freeFlowText = sr.freeFlowText;
      const reg = /([A-Z]{1,})(\/)([A-Z]{2}[0-9]{1,})(.)([A-Z-.]{1,})/g;
      const matchedGroups = reg.exec(freeFlowText);
      const association = this.getPaxAssociations(sr.associations);
      const ssr =
        matchedGroups[1] +
        matchedGroups[3].substring(0, 2) +
        matchedGroups[3].substring(2, matchedGroups[3].length) +
        matchedGroups[5] +
        association;
      valuesArr.push(ssr);
      const group = this.fb.group({
        name: new FormControl(matchedGroups[1], [Validators.required]),
        countryCode: new FormControl(matchedGroups[3].substring(0, 2), [Validators.required]),
        phone: new FormControl(matchedGroups[3].substring(2, matchedGroups[3].length), [Validators.required]),
        freeFlowText: new FormControl(matchedGroups[5], [Validators.required]),
        passengers: new FormControl(association, [])
      });
      if (valuesArr.length === 1 || valuesArr.indexOf(ssr) === -1) {
        groupArray.push(group);
      }
    }
    return groupArray;
  }

  getDeleteSSRElements(ssr) {
    for (const sr of ssr) {
      if (sr.fullNode.serviceRequest.ssr.type === 'PCTC') {
        this.deleteSRline.push(sr.elementNumber);
      }
    }
  }

  getPaxAssociations(associations) {
    if (associations) {
      for (const a of associations) {
        for (const p of this.pnrService.pnrObj.nameElements) {
          if (a.tatooNumber === p.tatooNumber && a.segmentType === p.segmentType) {
            return 'P' + p.elementNumber;
          }
        }
      }
    }
  }
  addEmergencyContact() {
    this.arrayGroup = this.getSSRPreFilledValues();
    this.arrayGroup.push(this.createItem());
    this.addContactForm = new FormGroup({
      items: this.fb.array(this.arrayGroup)
    });
    this.items = this.addContactForm.get('items') as FormArray;
    this.showComponent = true;
  }
}
