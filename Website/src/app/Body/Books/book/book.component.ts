import { Component } from '@angular/core';
import { BookService } from './book.service';
import { Cart } from 'src/app/Common/CartModel';
import { MessageService } from '../../../Common/message/message.service';
import { NotifyService } from '../../../Common/Notification/notify/notify.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent {
  UserID; // Get User ID From LocalStorage

  ReqID = 100; // For Add To Cart

  constructor(
    private service: BookService,
    private msgservice: MessageService,
    private Notify: NotifyService
  ) {
    // Empty the values of Arrays that we use For Filters and Searching...
    this.ApiData = [];
    this.FilterAndSearch = [];

    service.GetBookList().subscribe((res) => {
      console.log(res);
      this.BookList = res;
      this.ApiData = res;

      this.InitialValuesOfMinMax(res); // Calculate Min and Max
    });

    this.UserID = localStorage.getItem('User');
    console.log(this.UserID);
  }

  BookList;

  ApiData;

  FilterAndSearch: any = [];

  AddToCart(item) {
    // alert("Adding To Cart");
    // console.log(item);

    let Body: Cart = {
      ID: item.id,
      Title: item.title,
      Price: item.price,
      Image: item.image,
      Quantity: 1,
      UserID: parseInt(this.UserID),
      ReqID: this.ReqID,
    };

    console.log(Body);

    this.service.UploadToCart(Body).subscribe((res) => {
      console.log(res);

      this.Notify.SendShowUpMsg('Added To Cart');
      this.ReloadMsgToCart(); // Reload The Cart Count From Here using Service
    });
  }

  ReloadMsgToCart() {
    this.msgservice.SendReloadMsg(true);
  }

  // Fields and Functions For Slider

  panelOpenState: boolean = false;

  // Initial Values
  Min: number = 0;
  Max: number = 0;

  // Dynamic Values
  min: number;
  max: number;

  Slider: FormGroup = new FormGroup({
    min: new FormControl(''),
    max: new FormControl(''),
  });

  Search: FormGroup = new FormGroup({
    Title: new FormControl(''),
  }); // For SearchBar

  GetSliderValue() {
    // alert("changed");
    this.min = this.Slider.get(['min'])?.value;
    this.max = this.Slider.get(['max'])?.value;

    this.FilterAndSearch = []; // Empty The Array

    this.ApiData.forEach((element) => {
      if (element.price >= this.min && element.price <= this.max) {
        this.FilterAndSearch.push(element);
      }
    });

    this.BookList = this.FilterAndSearch;
    // console.log(this.FilterAndSearch);
  }

  InitialValuesOfMinMax(data: any) {
    data.forEach((element) => {
      if (element.price > this.Max) {
        this.Max = element.price;
      }

      if (element.price < this.Min) {
        this.Min = element.price;
      }
    });
  }

  SearchByTitle() {
    let str: string = this.Search.get(['Title'])?.value;

    this.FilterAndSearch = []; // Empty The Array

    this.ApiData.forEach((element) => {
      if (element.title.toLowerCase().search(str.toLowerCase()) != -1) {
        console.log(element.title.toLowerCase().search(str.toLowerCase()));
        this.FilterAndSearch.push(element);
      }
    });

    this.BookList = this.FilterAndSearch;
    // console.log(this.FilterAndSearch);
  }
}
