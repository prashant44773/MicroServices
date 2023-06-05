import { Component } from '@angular/core';
import {BookService} from './book.service';
import { Cart } from 'src/app/Common/CartModel';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {

  ReqID = 100; // For Add To Cart

    constructor(private service : BookService){
        service.GetBookList().subscribe((res)=>{
            console.log(res);
            this.BookList = res;
        });
    }

    BookList;


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
