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

@Injectable()
export class ErrorInterceptorInterceptor implements HttpInterceptor {

  constructor(private route : Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        next:(event) => {
            if(event instanceof HttpResponse){
              if(event.status == 0){
                  alert("The Api is Down");
              }
            }
            return event;
        } ,
        error:(error)=>{
          if(error.status === 502) {
            // alert('Unauthorized access!');
            console.log("The Api is Down");
            this.route.navigate(['/Master/maintain']);
          }
          else if(error.status === 0) {
            alert('Page Not Found!');
          }
        }
      })
    );
  }
}
