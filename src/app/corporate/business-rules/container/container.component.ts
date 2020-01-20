import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { RulesEngineService } from 'src/app/service/business-rules/rules-engine.service';
import { BusinessRulesFormData } from 'src/app/models/business-rules/ui-business-rules.model';
import { PnrService } from 'src/app/service/pnr.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  containerForm: FormGroup;
  formTemplateData: BusinessRulesFormData[];
  @Input() containerFilter: string;

  constructor(private res: RulesEngineService, private pnrService: PnrService) { }

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

  hasShowCondition(conditions, input) {
    console.log(JSON.stringify(input));
    let result = true;
    if (conditions) {
      for (const cond of conditions) {
        let comparison = '';
        const regex = /(\[(?<conditionName>(.*)_(.*))_(?<conditionvalue>(.*))\])/g;
        const match = regex.exec(cond.controlName);
        if (match !== null) {
          switch (match.groups.conditionName) {
            case 'UI_FORM':
              comparison = this.containerForm.get(match.groups.conditionvalue).value;
              result = this.isConditionValid(comparison, cond.logic, cond.value);
              break;
            case 'UI_DEFAULT':
              if (match.groups.conditionvalue === 'TSTSEGMENTTYPE') {
                comparison = this.getSegmentType();
                const segtype = this.isConditionValid(comparison, cond.logic, cond.value);
                if (segtype) {
                  this.containerForm.get(input.controlName).setValue(cond.result);
                }
              }
              result = true;
              break;
          }
        }

        if (!result) {
          return false;
        }
      }
    }
    return true;
  }

  getSegmentType() {
    let segmentsTypes = this.pnrService.segments.map((x) => ({
      types: x.segmentType
    }));
    segmentsTypes = segmentsTypes.filter((thing, i, arr) => arr.findIndex((t) => t.types === thing.types) === i);
    return segmentsTypes.map(t => t.types).join('|');
    // const look = tst.find((x) => x);
  }

  isConditionValid(comparison, operator, value) {
    switch (operator) {
      case 'IS_NOT':
        return comparison !== value;
      case 'NOT_IN':
        return comparison.split('|').indexOf(value) === -1;
      case 'IN':
        return comparison.split('|').indexOf(value) >= 0;
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

}
