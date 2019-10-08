import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ofc-documentation',
  templateUrl: './ofc-documentation.component.html',
  styleUrls: ['./ofc-documentation.component.scss']
})
export class OfcDocumentationComponent implements OnInit {
  ofcDocForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.ofcDocForm = this.fb.group({
      ticketType: new FormControl('', [Validators.required]),
      isOscTravel: new FormControl('N', [Validators.required]),
      isOscQueue: new FormControl('N', [Validators.required])
    });
  }
}
