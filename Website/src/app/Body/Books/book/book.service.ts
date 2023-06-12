import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Cart } from 'src/app/Common/CartModel';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private api : HttpClient) { }

  // Master GateWayApi
  Api = "https://localhost:44358/";

  // getApi = "https://localhost:44392/api/Books/Get";  // BaseUrls
  // cart = "https://localhost:44317/api/Cart/BookCart";

  getApi = this.Api + "Books";
  cart = this.Api + "BookCart";

  GetBookList(){
    return this.api.get(this.getApi);
  }

  UploadToCart(Body:Cart){
    return this.api.post(this.cart,Body);
  }
}
