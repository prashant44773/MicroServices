import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PostData} from './PostModel';

@Injectable({
  providedIn: 'root'
})
export class BookadminserviceService {

  constructor(private api : HttpClient) { }


  BooKPost = "https://localhost:44392/api/Books/Post";

  AddBookApi(body:PostData){

      console.log("The Body Data :  ");
      console.log(body);

      return this.api.post(this.BooKPost,body);
  }
}
