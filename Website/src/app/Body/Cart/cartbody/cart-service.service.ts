import { Injectable } from '@angular/core';
import { HttpClient , HttpParams} from '@angular/common/http';
import { MyCartQuantity } from './AddToCart';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  constructor(private api : HttpClient) { }

  Url = "https://localhost:44317/api/Cart/";
  cart = this.Url + "UserCart";
  quan = this.Url + "Quantity";
  Remove = this.Url + "Remove";
  CartCount = this.Url + "UserCartCount";


  GetCartCount(ID:number){

    let QueryParams = new HttpParams().append("UserID",ID);

    return this.api.get(this.CartCount , {params : QueryParams});
  };


  GetCartList(ID:number){

    let QueryParams = new HttpParams().append("UserID",ID);

    return this.api.get(this.cart , {params : QueryParams});
  }


  UpdateQuantity(Body:MyCartQuantity)
  {
    return this.api.put(this.quan,Body);
  }

  RemoveFromCart(Body:MyCartQuantity)
  {
    return this.api.put(this.Remove,Body);
  }

}
