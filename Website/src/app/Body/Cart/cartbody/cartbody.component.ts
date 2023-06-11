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
import { MessageService } from '../../../Common/message/message.service';

@Component({
  selector: 'app-cartbody',
  templateUrl: './cartbody.component.html',
  styleUrls: ['./cartbody.component.css'],
})
export class CartbodyComponent {
  constructor(
    private api: CartServiceService,
    private msgservice: MessageService
  ) {
    this.UserID = localStorage.getItem('User');
    console.log(`This is ths UserID in the Cart :  ${this.UserID}`);

    this.LoadCartDataApi();
  }

  LoadCartDataApi() {
    // So we Can Reload Cart Data After Updates and Deleteions
    this.api.GetCartList(parseInt(this.UserID)).subscribe((res) => {
      this.CartData = res;
      console.log(res);
    });
  }

  UserID; // Get User ID From LocalStorage

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
      UserID: parseInt(this.UserID),
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
      UserID: parseInt(this.UserID),
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
      this.ReloadMsgToCart(); // Reload The Cart Count From Here using Service
    });
  }

  ReloadMsgToCart() {
    this.msgservice.SendReloadMsg(true);
  }

  // Calculating Totals For Grid
  CalculateTotals(GridData) {

  }
  // Calculating Totals For Grid
}
