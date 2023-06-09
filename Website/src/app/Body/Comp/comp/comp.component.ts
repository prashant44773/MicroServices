import { Component } from '@angular/core';
import { CompServiceService } from './comp-service.service';
import { Cart } from 'src/app/Common/CartModel';
import {MessageService} from '../../../Common/message/message.service';

@Component({
  selector: 'app-comp',
  templateUrl: './comp.component.html',
  styleUrls: ['./comp.component.css']
})
export class CompComponent {

    UserID;

    ReqID = 200; // For Add To Cart

    constructor(private service : CompServiceService , private msgservice : MessageService){
        service.GetCompList().subscribe((res)=>{
            console.log(res);
            this.CompList = res;
        });

        this.UserID = localStorage.getItem("User");
    }

    CompList;


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
