import { Component } from '@angular/core';
import {BookService} from './book.service';
import { Cart } from 'src/app/Common/CartModel';
import { CartComponent } from '../../Cart/cart/cart.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {

  UserID ;  // Get User ID From LocalStorage

  ReqID = 100; // For Add To Cart

    constructor(private service : BookService){
        service.GetBookList().subscribe((res)=>{
            console.log(res);
            this.BookList = res;
        });

        this.UserID = localStorage.getItem("User");
        console.log(this.UserID);
    }

    BookList;


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
      });
    }
}
