import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartbodyComponent } from '../cartbody/cartbody.component';
import { CartServiceService } from '../cartbody/cart-service.service';
import { MessageService } from '../../../Common/message/message.service';
import { Router } from '@angular/router';
import { RouterguardService } from 'src/app/Common/Guard/routerguard.service';
import { NotifyService } from '../../../Common/Notification/notify/notify.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private api: CartServiceService,
    private Message: MessageService,
    private Authenticate : RouterguardService,
    private route : Router,
    private Notify :NotifyService
  ) {
    this.UserID = localStorage.getItem('User');

    this.isActive = false; // ReSet This Variable On Every Load of Componenet

    this.getCount();

    this.CheckButtonStatus();
  }

  ReloadTheApi: boolean = false;

  UserID;

  CartCount;

  isActive:boolean = true;

  getCount() {
    this.api.GetCartCount(parseInt(this.UserID)).subscribe((res) => {
      // alert('Getting Cart Count');
      console.log(res);
      this.CartCount = res;
    });
  }


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


  LogOut(){
    // alert("LoggingOut");
      this.Authenticate.LoggedIn = false; // Allow user To LogOut
      this.route.navigate(['/login']);

      this.Notify.SendShowUpMsg("You Have Been Logged Out");
  }

  CheckButtonStatus(){
    this.api.ActiveOrNot().subscribe((res:any)=>{
      this.isActive = res;
      console.log(`isActive  :  `,this.isActive);
    });
  }
}
