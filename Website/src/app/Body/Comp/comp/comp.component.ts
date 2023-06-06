import { Component } from '@angular/core';
import { CompServiceService } from './comp-service.service';
import { Cart } from 'src/app/Common/CartModel';

@Component({
  selector: 'app-comp',
  templateUrl: './comp.component.html',
  styleUrls: ['./comp.component.css']
})
export class CompComponent {

    ReqID = 200; // For Add To Cart

    constructor(private service : CompServiceService){
        service.GetCompList().subscribe((res)=>{
            console.log(res);
            this.CompList = res;
        });
    }

    CompList;


    AddToCart(item){
      alert("Adding To Cart");
      // console.log(item);

      let Body:Cart = {
        Price : item.price,
        ProductID : item.id,
        RequestID : this.ReqID,
        UserID : 1
      };

      console.log(Body);

      this.service.UploadToCart(Body).subscribe((res)=>{
          console.log(res);
      });
    }
}
