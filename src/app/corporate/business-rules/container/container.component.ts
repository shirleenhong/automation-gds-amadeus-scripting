import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { RulesEngineService } from 'src/app/service/business-rules/rules-engine.service';
import { BusinessRulesFormData } from 'src/app/models/business-rules/ui-business-rules.model';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  containerForm: FormGroup;
  formTemplateData: BusinessRulesFormData[];
  @Input() containerFilter: string;

  constructor(private res: RulesEngineService) { }

  ngOnInit() {
    this.createRuleForm();
  }

  private createRuleForm() {
    if (this.containerFilter) {
      const formGroup = {};
      this.formTemplateData = this.res.getRuleFormData(this.containerFilter);

      this.formTemplateData.forEach((formControl) => {
        formGroup[formControl.controlName] = new FormControl('');
      });
      this.containerForm = new FormGroup(formGroup);
      this.subscribeChange();
    }
  }

  subscribeChange() {
    this.formTemplateData.forEach((control) => {
      this.containerForm.get(control.controlName).valueChanges.subscribe((c) => {
        this.res.setFormUIEntityValue('UI_FORM_' + control.controlName, c);
      });
    });
  }

  hasShowCondition(conditions) {
    // return true;
    // console.log(conditions);
    if (conditions) {
      for (const cond of conditions) {
        let comparison = '';
        const regex = /(\[(?<conditionName>(.*)_(.*))_(?<conditionvalue>(.*))\])/g;
        const match = regex.exec(cond.controlName);
        if (match !== null) {
          switch (match.groups.conditionName) {
            case 'UI_FORM':
              comparison = this.containerForm.get(match.groups.conditionvalue).value;
              break;
            case 'UI_DEFAULT':

              break;
          }
        }
        const result = this.isConditionValid(comparison, cond.logic, cond.value);
        if (!result) {
          return false;
        }
      }
    }
    return true;
  }

  isConditionValid(comparison, operator, value) {
    switch (operator) {
      case 'IS_NOT':
        return comparison !== value;
      default:
        return false;
    }
  }

  applyCondition(selectedValue, options) {
    options.forEach(opt => {
      if (opt.value === selectedValue && opt.defaultControl) {
        this.containerForm.get(opt.defaultControl).setValue(opt.defaultValue);
        this.containerForm.get(opt.defaultControl).setValidators([Validators.required]);
      } else {
        this.containerForm.get(opt.defaultControl).setValue('');
        this.containerForm.get(opt.defaultControl).clearValidators();
        this.containerForm.get(opt.defaultControl).updateValueAndValidity();
      }
    });
  }

  // getTSTSegment(){

  // }
}
