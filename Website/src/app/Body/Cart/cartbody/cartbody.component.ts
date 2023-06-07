import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {
  CancelEvent,
  EditEvent,
  RemoveEvent,
  SaveEvent,
} from '@progress/kendo-angular-grid';
import { CartServiceService } from './cart-service.service';
import { MyCartQuantity } from './AddToCart';

@Component({
  selector: 'app-cartbody',
  templateUrl: './cartbody.component.html',
  styleUrls: ['./cartbody.component.css'],
})
export class CartbodyComponent {
  constructor(private api: CartServiceService) {
    this.LoadCartDataApi();
  }

  LoadCartDataApi() {
    // So we Can Reload Cart Data After Updates and Deleteions
    this.api.GetCartList(this.UserID).subscribe((res) => {
      this.CartData = res;
      console.log(res);
    });
  }

  UserID = 1;

  CartData;

  group: FormGroup; // FormGroup For Editing

  protected editHandler(args: EditEvent): void {
    // alert(1);
    this.group = new FormGroup({
      id: new FormControl(args.dataItem.id),
      quantity: new FormControl(args.dataItem.quantity),
      reqid: new FormControl(args.dataItem.reqID),
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

    // console.log(this.group.get('id')?.value);
    // console.log(this.group.get('quantity')?.value);

    let Quan: MyCartQuantity = {
      UserID: this.UserID,
      ID: this.group.get('id')?.value,
      Quantity: this.group.get('quantity')?.value,
      Price: 0,
      Title: 'T',
      Image: 'I',
      ReqID: this.group.get('reqid')?.value,
    };

    // console.log(Quan);

    this.api.UpdateQuantity(Quan).subscribe((res) => {
      console.log(res);
      this.LoadCartDataApi();
    });
  }

  public removeHandler(args: RemoveEvent): void {

    alert('Remove');
    // console.log(args.dataItem);

    let Remove: MyCartQuantity = {
      UserID: this.UserID,
      ID: args.dataItem.id,
      Quantity: args.dataItem.quantity,
      Price: args.dataItem.price,
      Title: args.dataItem.title,
      Image: args.dataItem.image,
      ReqID: args.dataItem.reqID,
    };

    // console.log(Remove);

    this.api.RemoveFromCart(Remove).subscribe((res) => {
      console.log(res);
      this.LoadCartDataApi();
    });
  }
}
