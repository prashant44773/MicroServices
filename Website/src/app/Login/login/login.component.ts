import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {KeyCloakService} from '../../Common/key-cloak.service';
import * as shajs from 'sha.js';
import {RouterguardService} from '../../Common/Guard/routerguard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  constructor(private Api : KeyCloakService , private Authenticate : RouterguardService , private route : Router){

  }

  LoginForm: FormGroup = new FormGroup({
    user: new FormControl('', [Validators.required,Validators.minLength(3)]),
    pass: new FormControl('', [Validators.required,Validators.minLength(3)]),
  });

  RegisterForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.minLength(3) , Validators.email]),
    user: new FormControl('', [Validators.required, Validators.minLength(3)]),
    pass: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  ActivateRegisterPage = false;

  Activate() {
    if (this.ActivateRegisterPage) {
      this.ActivateRegisterPage = false;
    } else {
      this.ActivateRegisterPage = true;
    }
  }

  EncryptPassword(password){
    return shajs('sha256').update({password}).digest('hex');
  }


  LoginData(data:any){
    // this.login.get('name of you control').value
    let user = this.LoginForm.get('user')?.value;
    let pass = this.EncryptPassword(this.LoginForm.get('pass')?.value);

    this.Api.Login(user,pass).subscribe((res:any)=>{
        // localStorage.setItem('Role',res.roles);
        // localStorage.setItem('Token',res.token);
        console.log(res);

        if(res.statusCode == 200){
          this.Api.GetUserID(user,pass).subscribe((res:any)=>{
              // alert("Got The USerID");
              localStorage.setItem('User',res.userID);
              // alert("You Have Been LoggedIN");
              this.Authenticate.LoggedIn = true; // Allow user To Navigate To Home Page
              this.route.navigate(['/Master/home']);
          });
        }
      });

    this.LoginForm.reset();
  }

  RegisterData(data:any){
      let name  = this.RegisterForm.get('name')?.value;
      let email  = this.RegisterForm.get('email')?.value;
      let user  = this.RegisterForm.get('user')?.value;
      let pass  = this.EncryptPassword(this.RegisterForm.get('pass')?.value);

      this.Api.Register(name,email,user,pass).subscribe((res:any)=>{
        console.log(res);

        if(res.statusCode == 200){
          this.ActivateRegisterPage =false;
        }
      });

      this.RegisterForm.reset();
  }
}
