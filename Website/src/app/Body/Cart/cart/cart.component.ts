import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartbodyComponent } from '../cartbody/cartbody.component';
import { CartServiceService } from '../cartbody/cart-service.service';
import { MessageService } from '../../../Common/message/message.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private api: CartServiceService,
    private Message: MessageService
  ) {
    this.UserID = localStorage.getItem('User');

    this.getCount();
  }

  ReloadTheApi: boolean = false;

  getCount() {
    this.api.GetCartCount(parseInt(this.UserID)).subscribe((res) => {
      // alert('Getting Cart Count');
      console.log(res);
      this.CartCount = res;
    });
  }

  UserID;

  CartCount;

  openDialog() {
    const dialogRef = this.dialog.open(CartbodyComponent, {
      position: { left: '10%' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      console.log('Its Working');
    });
  }

  ngOnInit(): void {
    this.Message.ReloadMsg.subscribe((message) => {
      this.ReloadTheApi = message;
      // alert('Reloading This Cart Because The Cart is Updated');
      this.getCount(); // Reloading the Count of AddedCarts
    });
  }
}
