import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from 'src/app/Common/CartModel';

@Injectable({
  providedIn: 'root'
})
export class FashService {

  constructor(private api : HttpClient) { }

  getApi = "https://localhost:44339/api/Fash/Get";

  cart = "https://localhost:44317/api/Cart/FashCart";

  GetFashList(){
    return this.api.get(this.getApi);
  }

  UploadToCart(Body:Cart){
    return this.api.post(this.cart,Body);
  }
}
