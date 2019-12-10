import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BusinessRulesFormData } from 'src/app/models/business-rules/ui-business-rules.model';

@Injectable({
  providedIn: 'root'
})
export class RuleUiService {
  constructor() {}

  generateForm(formData: BusinessRulesFormData[]) {
    const formGroup = {};
    formData.forEach((formControl) => {
      formGroup[formControl.controlName] = new FormControl('');
    });
    return new FormGroup(formGroup);
  }

  async generateFormHtml(formData: BusinessRulesFormData[]) {
    let html = '';
    await formData.forEach((control) => {
      switch (control.controlType) {
        case 'text':
          html += this.generateTextboxHtml(control);
          break;
        case 'select':
          break;
        case 'checkbox':
          break;
        case 'radio':
      }
    });

    return this.addHeaderFooterForm(html);
  }

  addHeaderFooterForm(html) {
    return '<div class="container">' + '<form [formGroup]="ruleForm" class="form-group" style="padding:5px;">' + html + '</form> </div>';
  }

  generateTextboxHtml(input: BusinessRulesFormData) {
    const html =
      '<div class="row"> ' +
      '<div class="col-3">' +
      '<label> ' +
      input.controlName +
      '</label>' +
      '</div>' +
      '<div class="col-4">' +
      '<input class="form-control" type="text"' +
      this.generateHtmlProperty(input) +
      '/> </div></div>';

    return html;
  }

  generateHtmlProperty(input) {
    return (
      ' formControlName="' +
      input.controlName +
      'name="' +
      input.controlName +
      ' ' +
      (input.validators.required ? 'required ' : ' ') +
      (input.validators.minlength ? 'minlength="' + input.validators.minlength + '"' : ' ') +
      (input.validators.maxlength ? 'maxlength="' + input.validators.maxlength + '"' : ' ')
    );
  }
}
