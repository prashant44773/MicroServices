import { Component } from '@angular/core';
import { GridComponent } from '@progress/kendo-angular-grid';
@Component({
  selector: 'app-cartbody',
  templateUrl: './cartbody.component.html',
  styleUrls: ['./cartbody.component.css']
})
export class CartbodyComponent {



  userTestStatus: { id: number, name: string ,pro:string}[] = [
    { "id": 0, "name": "Available" ,pro:"ProductImg1.png"},
    { "id": 1, "name": "Ready" ,pro:"ProductImg1.png"},
    { "id": 2, "name": "Started" ,pro:"ProductImg1.png"}
  ];

}
