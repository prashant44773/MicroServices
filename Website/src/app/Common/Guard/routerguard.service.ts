import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouterguardService {

  constructor() { }

  LoggedIn:boolean = false;

  isLoggedIN(){
    // console.log(`it is Called  :  ${this.LoggedIn}`);
    return this.LoggedIn;
  }
}
