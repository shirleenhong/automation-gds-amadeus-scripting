import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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

  constructor(private res: RulesEngineService) {}

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
}
