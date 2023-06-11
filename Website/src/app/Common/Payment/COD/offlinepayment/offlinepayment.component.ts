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
import { Cart } from 'src/app/Common/CartModel';

@Component({
  selector: 'app-offlinepayment',
  templateUrl: './offlinepayment.component.html',
  styleUrls: ['./offlinepayment.component.css'],
})
export class OfflinepaymentComponent implements OnInit {
  constructor(public dialog: MatDialog, public routeData: ActivatedRoute) {
    this.UserID = localStorage.getItem('User');
    // console.log(parseInt(this.UserID));

    // console.log('Testing Type');
    // console.log(this instanceof Array);
  }

  ngOnInit(): void {
    // alert('Getting Routed Object');
    this.routeData.paramMap
      .pipe(map(() => window.history.state))
      .subscribe((res) => {
        console.log('Routed Object');
        // console.log(res);
        // console.log(res[0]);

        if (res[1] == 'Online') {
          this.OnlinePayment = true;
        }
        if (res[1] == 'Offline') {
          this.OnlinePayment = false;
        }

        // Checking if its an ArrayOrNot
        if (res[0] instanceof Array) {
          alert("it's an Array");

          this.isArray = true;

          this.CustomerOrders = res[0];

          let Count = 0;
          this.CustomerOrders.forEach((element) => {
            if (Count == 0) {
              this.ProductName = element.title;
            } else {
              this.ProductName = this.ProductName + '  ,  ' + element.title;
            }
            Count = Count + 1;
          });
          console.log(this.CustomerOrders);
        } else {
          alert("it's Not an Array");

          this.isArray = false;

          // Process The Object Into ObjectList
          this.ProductName = res[0].title;

          let data: Cart = {
            ID: res[0].title,
            Title: res[0].title,
            Price: res[0].price,
            Image: res[0].image,
            Quantity: res[0].Qua,
            UserID: parseInt(this.UserID),
            ReqID: res[0].reqID,
          };

          this.CustomerOrders.push(data);
          console.log(this.CustomerOrders);
        }
      });
  }

  isArray: Boolean; // To Check whether the Coming DataType is Array Or Object
  // (this is For OnlinePayment Components Order Recap)

  UserID;

  // CustomerOrders;
  CustomerOrders: any = [];

  ProductName = 'Test';

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
      // alert('Form Data');

      let Customer: ProductFormData = {
        UserID: parseInt(this.UserID),
        Name: this.ProductForm.get(['Name'])?.value,
        LastName: this.ProductForm.get(['LastName'])?.value,
        Date: this.ProductForm.get(['Date'])?.value as Date,
        Address: this.ProductForm.get(['Address'])?.value,
        City: this.ProductForm.get(['City'])?.value,
        Region: this.ProductForm.get(['Region'])?.value,
        Code: this.ProductForm.get(['Code'])?.value,
        Country: this.ProductForm.get(['Country'])?.value,
        Products: this.CustomerOrders,
        CardDetails: { CardNumber: 0, CardHolderName: '', CardType: '' },
      };

      console.log(Customer); // Product FormData

      if (this.OnlinePayment) {
        this.openDialog(Customer);
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

  openDialog(CustomerCredentials: ProductFormData): void {
    const dialogRef = this.dialog.open(OnlinePaymentComponent, {
      height: 'inherit',
      // height:'100%',
      width: '100%',
      data: {
        ProductData: CustomerCredentials,
        isArray: this.isArray
      },
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
