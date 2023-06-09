import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogUser } from './login';

@Injectable({
  providedIn: 'root',
})
export class KeyCloakService {

  // Using This Service For login

  regApi: LogUser;
  logApi: LogUser;

  constructor(private server: HttpClient) {}

  Api = "https://localhost:44378/api/Login/";
  RegisterAPi = this.Api + 'Register';
  LoginAPi = this.Api + 'Login';
  UserID = this.Api + "GetUserID";

  Register(name: any, email: any, user: any, pass: any) {
    this.regApi = {
      username: user,
      password: pass,
      name: name,
      email: email,
    };

    return this.server.post(this.RegisterAPi, this.regApi);
  }

  Login(name: any, pass: any) {
    this.logApi = {
      username: name,
      password: pass,
      name: '',
      email: '',
    };

    return this.server.post(this.LoginAPi, this.logApi);
  }

  GetUserID(name: any, pass: any) {
    this.logApi = {
      username: name,
      password: pass,
      name: '',
      email: '',
    };

    return this.server.post(this.UserID, this.logApi);
  }
}
