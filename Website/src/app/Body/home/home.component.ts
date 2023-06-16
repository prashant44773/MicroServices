import { Component } from '@angular/core';
import { BookService } from '../Books/book/book.service';
import { CompServiceService } from '../Comp/comp/comp-service.service';
import { FashService } from '../Fash/fash/fash.service';
import { NotifyService } from 'src/app/Common/Notification/notify/notify.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(
    private Book: BookService,
    private Comp: CompServiceService,
    private Fash: FashService,
    private Notify:NotifyService
  ) {

    this.Notify.CallTheErrorPage(false); // Activate The Erro Page using this Funciton for Each Reequest

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
