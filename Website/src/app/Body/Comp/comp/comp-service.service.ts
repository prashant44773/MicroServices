import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from 'src/app/Common/CartModel';

@Injectable({
  providedIn: 'root'
})
export class CompServiceService {

  constructor(private api : HttpClient) { }

  getApi = "Comp API";

  cart = "https://localhost:44317/api/Cart/Post";

  GetCompList(){
    return this.api.get(this.getApi);
  }

  AddToCart(Body:Cart){
    return this.api.post(this.cart,Body);
  }
}
