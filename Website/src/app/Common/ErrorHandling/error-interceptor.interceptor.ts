import { Injectable, Pipe } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { NotifyService } from '../Notification/notify/notify.service';


@Injectable()
export class ErrorInterceptorInterceptor implements HttpInterceptor {

  constructor(private route : Router , private Notify : NotifyService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        next:(event) => {
            if(event instanceof HttpResponse){
              if(event.status == 200){
                  // alert("Request Successful");
              }
            }
            return event;
        } ,
        error:(error)=>{
          if(error.status === 502) {
            // alert('Interceptor in Action');
            // this.Notify.CallTheErrorPage(false); // Activate The Erro Page using this Funciton for Each Reequest
            if(this.Notify.ActiveErrorPage){
              this.Notify.ActiveErrorPage = false;
              this.Notify.SendShowUpMsg("This Page is Currently Under Maintainance");
              this.route.navigate(['/Master/maintain']);
            }
            else{
              // console.log("OFF This Feature For HomePage");
              this.Notify.SendShowUpMsg("Few Services Are Taken Down For Maintanance");
            }
          }
          else if(error.status === 0) {
            alert('Page Not Found!');
          }
        }
      })
    );
  }
}
