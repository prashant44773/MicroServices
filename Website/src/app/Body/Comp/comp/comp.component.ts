import { Component } from '@angular/core';
import { CompServiceService } from './comp-service.service';

@Component({
  selector: 'app-comp',
  templateUrl: './comp.component.html',
  styleUrls: ['./comp.component.css']
})
export class CompComponent {

  ReqID = 100; // For Add To Cart

  constructor(private service : CompServiceService){
      service.GetCompList().subscribe((res)=>{
          console.log(res);
          this.CompList = res;
      });
  }

  CompList;


  AddToCart(item){
    alert("Adding To Cart");
    console.log(item);
  }

}
