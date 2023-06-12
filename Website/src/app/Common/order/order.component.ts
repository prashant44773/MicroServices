import { Component , OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{

    constructor(public routeData : ActivatedRoute) { }

    Ordered:any;
    // Ordered:any = [{id:45,title:"Hello",price:1000,Qua:4},{id:46,title:"From",price:1300,Qua:2},{id:47,title:"Order",price:500,Qua:6}];
    // Ordered:any = {id:45,title:"Hello",price:1000,Qua:4};

    TheImagePath;

    ngOnInit(): void {
        // alert("Getting Routed Object");
        this.routeData.paramMap.pipe(
          map(()=> window.history.state)).subscribe(res=>{

            this.Ordered = res;
            console.log("Routed Object");
            console.log(this.Ordered);

            if(this.Ordered.reqID == 100){
                  this.TheImagePath = "assets/Images/Books/" + this.Ordered.image;
            }

            if(this.Ordered.reqID == 200){
                  this.TheImagePath = "assets/Images/Computers/" + this.Ordered.image;
            }

            if(this.Ordered.reqID == 300){
                  this.TheImagePath = "assets/Images/Fashion/" + this.Ordered.image;
            }
        });
    }
}
