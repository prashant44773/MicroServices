import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Cart } from 'src/app/Common/CartModel';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private api : HttpClient) { }

  getApi = "https://localhost:44392/api/Books/Get";

  cart = "https://localhost:44317/api/Cart/BookCart";

  GetBookList(){
    return this.api.get(this.getApi);
  }

  UploadToCart(Body:Cart){
    return this.api.post(this.cart,Body);
  }
}
