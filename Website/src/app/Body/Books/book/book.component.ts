import { Component } from '@angular/core';
import {BookService} from './book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {

  Rout = {
    id:1,
    name:"LoneWolf",
    email:"LoneWolf@gmail.com"
  };

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
      console.log(item);
    }
}
