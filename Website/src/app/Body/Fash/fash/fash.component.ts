import { Component } from '@angular/core';
import { FashService } from './fash.service';
import { Cart } from 'src/app/Common/CartModel';
import {MessageService} from '../../../Common/message/message.service';

@Component({
  selector: 'app-fash',
  templateUrl: './fash.component.html',
  styleUrls: ['./fash.component.css']
})
export class FashComponent {

  UserID;

  ReqID = 300; // For Add To Cart

  constructor(private service : FashService , private msgservice : MessageService){
      service.GetFashList().subscribe((res)=>{
          console.log(res);
          this.FashList = res;
      });

      this.UserID = localStorage.getItem("User");
  }

  FashList;


  AddToCart(item){
    alert("Adding To Cart");
    // console.log(item);

    let Body:Cart = {
      ID : item.id,
        Title:item.title,
        Price : item.price,
        Image : item.image,
        Quantity : 1,
        UserID : parseInt(this.UserID),
        ReqID : this.ReqID
    };

    console.log(Body);

    this.service.UploadToCart(Body).subscribe((res)=>{
        console.log(res);

        this.ReloadMsgToCart();  //  Reload The Cart Count From Here using Service
    });
  }

  ReloadMsgToCart(){
    this.msgservice.SendReloadMsg(true);
  }
}
