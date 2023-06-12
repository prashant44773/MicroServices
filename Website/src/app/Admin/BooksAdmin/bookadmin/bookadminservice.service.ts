import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PostData} from './PostModel';

@Injectable({
  providedIn: 'root'
})
export class BookadminserviceService {

  constructor(private api : HttpClient) { }

  // BaseUrl
  // BooKPost = "https://localhost:44392/api/Books/Post";
  // CompPost = "https://localhost:44302/api/Comp/Post";
  // FashPost = "https://localhost:44339/api/Fash/Post";

  MasterApi = "https://localhost:44358/";
  BooKPost =  this.MasterApi + "AddBook";
  CompPost = this.MasterApi + "AddComp";
  FashPost = this.MasterApi + "AddFash";

  AddBookApi(body:PostData){

      console.log("The Body Data :  ");
      console.log(body);

      return this.api.post(this.BooKPost,body);
  }

  AddCompApi(body:PostData){

      console.log("The Body Data :  ");
      console.log(body);

      return this.api.post(this.CompPost,body);
  }

  AddFashApi(body:PostData){

      console.log("The Body Data :  ");
      console.log(body);

      return this.api.post(this.FashPost,body);
  }
}
