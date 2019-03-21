import { Component, OnInit, Input } from '@angular/core';
import { RemarkViewModel } from '../models/remark-view.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-remarks',
  templateUrl: './remark.component.html',
  styleUrls: ['./remark.component.scss']
})
export class RemarkComponent implements OnInit {
  @Input()
  remarkSection: RemarkViewModel;

  @Input()
  parentForm: FormGroup;

  constructor() { }

  ngOnInit() {

  }

}
