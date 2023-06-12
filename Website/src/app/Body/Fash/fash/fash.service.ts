import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from 'src/app/Common/CartModel';

@Injectable({
  providedIn: 'root'
})
export class FashService {

  constructor(private api : HttpClient) { }

  // getApi = "https://localhost:44339/api/Fash/Get"; // BaseUrls
  // cart = "https://localhost:44317/api/Cart/FashCart";

  MasterApi = "https://localhost:44358/";

  getApi = this.MasterApi + "Fash";
  cart = this.MasterApi + "FashCart";

  GetFashList(){
    return this.api.get(this.getApi);
  }

  UploadToCart(Body:Cart){
    return this.api.post(this.cart,Body);
  }
}
