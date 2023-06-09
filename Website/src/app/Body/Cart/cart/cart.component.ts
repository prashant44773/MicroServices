import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartbodyComponent } from '../cartbody/cartbody.component';
import {CartServiceService} from '../cartbody/cart-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  constructor(public dialog: MatDialog , private api : CartServiceService) {

    this.UserID = localStorage.getItem("User");

    this.getCount();
  }

  getCount(){
    this.api.GetCartCount(parseInt(this.UserID)).subscribe((res)=>{
      alert("Getting Cart Count");
      console.log(res);
      this.CartCount = res;
  });
  }

  UserID;

  CartCount;

  openDialog() {
    const dialogRef = this.dialog.open(CartbodyComponent,{
        position:{left:'10%'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      console.log("Its Working");
    });
  }

}
