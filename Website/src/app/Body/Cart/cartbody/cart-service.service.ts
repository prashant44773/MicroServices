import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  constructor(private api : HttpClient) { }

  cart = "https://localhost:44317/api/Cart/UserCart";

  GetCartList(){
    return this.api.get(this.cart);
  }

}
