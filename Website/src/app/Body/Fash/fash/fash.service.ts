import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from 'src/app/Common/CartModel';

@Injectable({
  providedIn: 'root'
})
export class FashService {

  constructor(private api : HttpClient) { }

  getApi = "Fash API";

  cart = "https://localhost:44317/api/Cart/Post";

  GetFashList(){
    return this.api.get(this.getApi);
  }

  AddToCart(Body:Cart){
    return this.api.post(this.cart,Body);
  }
}
