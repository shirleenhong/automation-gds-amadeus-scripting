import { Component, OnInit } from '@angular/core';
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
  constructor(private res: RulesEngineService) { }

  ngOnInit() {
    this.createRuleForm();
  }

  private createRuleForm() {
    const formGroup = {};
    this.formTemplateData = this.res.getSpecificRulesValue('UI_ADD_CONTROL');
    this.formTemplateData.forEach(formControl => {
      formGroup[formControl.controlName] = new FormControl('');
    });
    this.containerForm = new FormGroup(formGroup);
  }

}
