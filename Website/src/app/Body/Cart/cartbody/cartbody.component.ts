import { Component } from '@angular/core';
import { GridComponent } from '@progress/kendo-angular-grid';
@Component({
  selector: 'app-cartbody',
  templateUrl: './cartbody.component.html',
  styleUrls: ['./cartbody.component.css']
})
export class CartbodyComponent {

  userTestStatus: { id: number, name: string }[] = [
    { "id": 0, "name": "Available" },
    { "id": 1, "name": "Ready" },
    { "id": 2, "name": "Started" }
  ];

}
