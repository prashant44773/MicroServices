import { Component } from '@angular/core';
import { FashService } from './fash.service';
import { Cart } from 'src/app/Common/CartModel';

@Component({
  selector: 'app-fash',
  templateUrl: './fash.component.html',
  styleUrls: ['./fash.component.css']
})
export class FashComponent {

  ReqID = 300; // For Add To Cart

  constructor(private service : FashService){
      service.GetFashList().subscribe((res)=>{
          console.log(res);
          this.FashList = res;
      });
  }

  FashList;


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
