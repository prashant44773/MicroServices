import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from 'src/app/Common/CartModel';

@Injectable({
  providedIn: 'root'
})
export class CompServiceService {

  constructor(private api : HttpClient) { }

  getApi = "https://localhost:44302/api/Comp/Get";

  cart = "https://localhost:44317/api/Cart/CompCart";

  GetCompList(){
    return this.api.get(this.getApi);
  }

  UploadToCart(Body:Cart){
    return this.api.post(this.cart,Body);
  }
}
