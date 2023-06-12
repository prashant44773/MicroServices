import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from 'src/app/Common/CartModel';

@Injectable({
  providedIn: 'root'
})
export class CompServiceService {

  constructor(private api : HttpClient) { }

  // getApi = "https://localhost:44302/api/Comp/Get"; // BaseUrls
  // cart = "https://localhost:44317/api/Cart/CompCart";

  MasterApi = "https://localhost:44358/";
  getApi = this.MasterApi + "Comp";
  cart = this.MasterApi + "CompCart";

  GetCompList(){
    return this.api.get(this.getApi);
  }

  UploadToCart(Body:Cart){
    return this.api.post(this.cart,Body);
  }
}
