/**
 * Very simple component that renders a list of segments
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'segments-list',
  styleUrls: ['../leisure/leisure.component.scss'],
  template: `
    <table class="table table-striped">
      <thead>
        <th>Suppliername</th>
        <th>From</th>
        <th>To</th>
        <th></th>
      </thead>
      <tbody>
        <tr *ngFor="let p of segments">
          <td>{{ p.suppliername }}</td>
          <td>{{ p.from }}</td>
          <td>{{ p.to }}</td>
          <td><button class="btn btn-sm btn-default" (click)="editSegment.emit(p)">Edit</button></td>
        </tr>
      </tbody>
    </table>
    <button class="btn btn-default" (click)="addSegment.emit()">Add new segment</button>
  `
})
export class SegmentsListComponent {
  @Input() segments;
  @Output() addSegment= new EventEmitter<any>();
  @Output() editSegment = new EventEmitter<any>();
}
