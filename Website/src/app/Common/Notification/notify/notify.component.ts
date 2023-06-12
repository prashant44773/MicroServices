import { Component ,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {NotifyService} from './notify.service';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit{

  constructor(private snackBar: MatSnackBar , private ShowNotification : NotifyService) {}

  ngOnInit(): void {
    this.ShowNotification.ReloadMsg.subscribe((message)=>{
      // alert("Show Notification WE are Called");
      console.log(message);
    })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action,{
      // duration: 1000,
      verticalPosition:'top',
      horizontalPosition:'center',
      // panelClass:['center']
    });
  }

  CallSnack(){
    this.ShowNotification.SendShowUpMsg("Hello SnackBar ShowUp");
  }

}
