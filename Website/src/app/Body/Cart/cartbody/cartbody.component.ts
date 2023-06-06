import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {
  CancelEvent,
  EditEvent,
  RemoveEvent,
  SaveEvent,
} from '@progress/kendo-angular-grid';
import {CartServiceService} from './cart-service.service';
import { MyCartQuantity } from './AddToCart';


@Component({
  selector: 'app-cartbody',
  templateUrl: './cartbody.component.html',
  styleUrls: ['./cartbody.component.css'],
})
export class CartbodyComponent {

  UserID = 1;

  constructor(private api : CartServiceService){
      this.api.GetCartList(this.UserID).subscribe((res)=>{
        this.CartData = res;
        console.log(res);
      });
  }

  CartData;


  group:FormGroup; // FormGroup For Editing

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

    let Quan:MyCartQuantity = {
      UserID:this.UserID,
      ID:this.group.get('id')?.value,
      Quantity:this.group.get('quantity')?.value,
      Price:0,
      Title:"T",
      Image:"I",
      ReqID:this.group.get('reqid')?.value
    };

    // console.log(Quan);

    this.api.UpdateQuantity(Quan).subscribe((res)=>{
        console.log(res);
    });
  }

  public removeHandler(args: RemoveEvent): void {
    // this.editService.remove(args.dataItem);
    alert("Remove");
    console.log(args.dataItem.id);
  }
}
