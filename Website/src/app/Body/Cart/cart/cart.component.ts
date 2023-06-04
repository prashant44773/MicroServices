import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartbodyComponent } from '../cartbody/cartbody.component';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  constructor(public dialog: MatDialog) {
  }

  CartCount = 25;

  openDialog() {
    const dialogRef = this.dialog.open(CartbodyComponent,{
        position:{left:'10%'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      console.log("Its Working");
    });
  }

}