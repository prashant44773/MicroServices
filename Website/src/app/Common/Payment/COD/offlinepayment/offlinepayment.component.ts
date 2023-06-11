import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OnlinePaymentComponent } from '../../Online/online-payment/online-payment.component';
import { ProductFormData } from '../../ProductFormModel';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-offlinepayment',
  templateUrl: './offlinepayment.component.html',
  styleUrls: ['./offlinepayment.component.css'],
})
export class OfflinepaymentComponent implements OnInit {
  constructor(public dialog: MatDialog, public routeData: ActivatedRoute) {

    this.UserID = localStorage.getItem("User");
    console.log(parseInt(this.UserID));
  }

  ngOnInit(): void {
    // alert('Getting Routed Object');
    this.routeData.paramMap
      .pipe(map(() => window.history.state))
      .subscribe((res) => {
        this.CustomerOrders = res[0];
        console.log('Routed Object');
        // console.log(this.CustomerOrders);
        // console.log(res[1]);

        if (res[1] == 'Online') {
          this.OnlinePayment = true;
        }
        if (res[1] == 'Offline') {
          this.OnlinePayment = false;
        }
      });
  }

  UserID;

  CustomerOrders;

  ProductName = "Can't Hurt Me";

  TermsAndConditions: Boolean = false;

  OnlinePayment: boolean = false; // For Radio Button of PaymentMode

  ProductForm: FormGroup = new FormGroup({
    Name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    LastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    Date: new FormControl('', [Validators.required]),
    Address: new FormControl('', [
      Validators.required,
      Validators.minLength(15),
    ]),
    City: new FormControl('', [Validators.required, Validators.minLength(2)]),
    Region: new FormControl('', [Validators.required, Validators.minLength(2)]),
    Code: new FormControl('', [Validators.required, Validators.minLength(3)]),
    Country: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
  });

  Agreed() {
    if (this.TermsAndConditions) {
      this.TermsAndConditions = false;
    } else {
      this.TermsAndConditions = true;
    }
  }

  Submit() {
    if (this.TermsAndConditions) {
      alert('Form Data');

      // let Customer:ProductFormData = {
      //     UserID =
      // };

      // this.ProductForm.get(['Name'])?.value // Product FormData

      if (this.OnlinePayment) {
        this.openDialog();
      }
    } else {
      alert('Agree With Terms And Conditions By Click On Button');
    }
  }

  getFormValidationErrors() {
    // alert("controlErrors");
    Object.keys(this.ProductForm.controls).forEach((key) => {
      let controlErrors: ValidationErrors = this.ProductForm.get(key)
        ?.errors as ValidationErrors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          //  console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(OnlinePaymentComponent, {
      height: 'inherit',
      // height:'100%',
      width: '100%',
      data: this.ProductForm.value,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  SwitchPaymentMode(Mode) {
    // alert("Mode is Changed");
    if (Mode == 'Online') {
      this.OnlinePayment = true;
    } else {
      this.OnlinePayment = false;
    }
  }
}
