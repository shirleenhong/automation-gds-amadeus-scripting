import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

declare var smartScriptSession: any;
@Component({
  selector: 'app-assign-invoice-to-oid',
  templateUrl: './assign-invoice-to-oid.component.html',
  styleUrls: ['./assign-invoice-to-oid.component.scss']
})
export class AssignInvoiceToOidComponent implements OnInit {
  assignInvoiceForm: FormGroup;
  mnem = '';
  constructor(private fb: FormBuilder) {
    this.extractMnem();
  }

  ngOnInit() {
    this.assignInvoiceForm = this.fb.group({
      task: new FormControl('', [Validators.required]),
      start: new FormControl('', [Validators.required]),
      end: new FormControl('', [Validators.required])
    });
  }

  async extractMnem() {
    await smartScriptSession.send('TTQLIST').then((res) => {
      const regex = /(?<mnem>[0-9A-Z]{6})\s\sJINV\/GENERAL/g;
      const match = regex.exec(res.Response);
      if (match !== null) {
        this.mnem = match.groups.mnem;
      }
    });
  }
}
