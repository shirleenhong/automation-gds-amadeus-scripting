import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent implements OnInit {
@Input()  selectedIndex: 1;
myIndex:1;
isHidden=true;
  constructor() { }

  ngOnInit() {
  }

}
