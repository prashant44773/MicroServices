import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {
  CancelEvent,
  EditEvent,
  RemoveEvent,
  SaveEvent,
} from '@progress/kendo-angular-grid';
import { MyCart } from './AddToCart';
@Component({
  selector: 'app-cartbody',
  templateUrl: './cartbody.component.html',
  styleUrls: ['./cartbody.component.css'],
})
export class CartbodyComponent {
  userTestStatus:MyCart [] = [
    { id: 0, name: 'Available', pro: 'ProductImg1.png', price: 5000, Qty: 34 },
    { id: 1, name: 'Ready', pro: 'ProductImg1.png', price: 15000, Qty: 55 },
    { id: 2, name: 'Started', pro: 'ProductImg1.png', price: 8000, Qty: 66 },
  ];

  group:FormGroup; // FormGroup For Editing

  protected editHandler(args: EditEvent): void {
    // alert(1);
    this.group = new FormGroup({
      id: new FormControl(args.dataItem.id),
      Qty: new FormControl(args.dataItem.Qty),
      // other fields
    });
    // console.log(args);
    args.sender.editRow(args.rowIndex, this.group);
  }

  public cancelHandler(args: CancelEvent): void {
    args.sender.closeRow(args.rowIndex);
  }

  public saveHandler(args: SaveEvent): void {
    args.sender.closeRow(args.rowIndex);

    console.log(this.group.get('id')?.value);
    console.log(this.group.get('Qty')?.value);
  }

  public removeHandler(args: RemoveEvent): void {
    // this.editService.remove(args.dataItem);
    alert("Remove");
    console.log(args.dataItem.id);
  }
}
