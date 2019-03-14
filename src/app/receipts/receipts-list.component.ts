/**
 * Very simple component that renders a list of receipts
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'receipts-list',
  template: `
    <table class="table table-striped">
      <thead>
        <th>Suppliername</th>
        <th>From</th>
        <th>To</th>
        <th></th>
      </thead>
      <tbody>
        <tr *ngFor="let p of receipts">
          <td>{{ p.suppliername }}</td>
          <td>{{ p.from }}</td>
          <td>{{ p.to }}</td>
          <td><button class="btn btn-sm btn-default" (click)="editReceipt.emit(p)">Edit</button></td>
        </tr>
      </tbody>
    </table>
    <button class="btn btn-default" (click)="addReceipt.emit()">Add new receipt</button>
  `
})
export class ReceiptsListComponent {
  @Input() receipts;
  @Output() addReceipt= new EventEmitter<any>();
  @Output() editReceipt = new EventEmitter<any>();
}
