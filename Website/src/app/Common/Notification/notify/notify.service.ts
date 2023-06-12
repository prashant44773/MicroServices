import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor( private snackBar: MatSnackBar ){ }

  private CallingSnackBar = new Subject<string>();

  ReloadMsg = this.CallingSnackBar.asObservable();

  SendShowUpMsg(Message:string){
      // alert("Message SErvice is Called");
      this.CallingSnackBar.next(Message);

      this.openSnackBar(Message,'');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action,{
      duration: 2000,
      verticalPosition:'top',
      horizontalPosition:'center',
      // panelClass:['center']
    });
  }

}
