import { Component } from '@angular/core';
import { BookService } from '../Books/book/book.service';
import { CompServiceService } from '../Comp/comp/comp-service.service';
import { FashService } from '../Fash/fash/fash.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(
    private Book: BookService,
    private Comp: CompServiceService,
    private Fash: FashService
  ) {
    this.Book.GetBookList().subscribe((res) => {
      // console.log(res);
      this.ProductsItem.push(res[0]);
    });

    this.Comp.GetCompList().subscribe((res) => {
      // console.log(res);
      this.ProductsItem.push(res[0]);
    });

    this.Fash.GetFashList().subscribe((res) => {
      // console.log(res);
      this.ProductsItem.push(res[0]);
    });
    console.log(this.ProductsItem);
  }

  ProductsItem:any = [];

}
