import { Component } from '@angular/core';
import { FashService } from './fash.service';

@Component({
  selector: 'app-fash',
  templateUrl: './fash.component.html',
  styleUrls: ['./fash.component.css']
})
export class FashComponent {

  Rout = {
    id:1,
    name:"LoneWolf",
    email:"LoneWolf@gmail.com"
  };

  ReqID = 100; // For Add To Cart

  constructor(private service : FashService){
      service.GetFashList().subscribe((res)=>{
          console.log(res);
          this.FashList = res;
      });
  }

  FashList;


  AddToCart(item){
    alert("Adding To Cart");
    console.log(item);
  }

}
