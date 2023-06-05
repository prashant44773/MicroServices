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

    ngOnInit(): void {
        alert("Getting Routed Object");
        this.routeData.paramMap.pipe(
          map(()=> window.history.state)).subscribe(res=>{

            this.Ordered = res;
            console.log("Routed Object");
            console.log(this.Ordered);
        });
    }
}
