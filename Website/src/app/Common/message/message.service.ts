import { Injectable } from '@angular/core';
import {Subject , Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  private successMsgSource = new Subject<boolean>();

  ReloadMsg = this.successMsgSource.asObservable();;

  SendReloadMsg(message:true){
      // alert("Message SErvice is Called");
      this.successMsgSource.next(message);
  }

}
