import { Component } from '@angular/core';
import { Payment } from '../../OnlinePayment';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { ProductFormData } from '../../ProductFormModel';

@Component({
  selector: 'app-online-payment',
  templateUrl: './online-payment.component.html',
  styleUrls: ['./online-payment.component.css'],
})
export class OnlinePaymentComponent {
  constructor(@Inject(MAT_DIALOG_DATA) data) {
    alert('Getting Product Form Data');
    console.log(data);
    if (data.isArray) {
      this.SingleProduct = false;
      // alert(this.SingleProduct);
      let Count = 0;
      data.ProductData.Products.forEach((element) => {
        if (Count == 0) {
            this.TotalQuantity = element.Qua;
            this.TotalPrice = element.price * element.Qua;
        }
        else
        {
          this.TotalQuantity = this.TotalQuantity +  element.Qua;
          this.TotalPrice = this.TotalPrice + element.price * element.Qua;
        }
        Count = Count + 1;
      });
    } else {
      this.SingleProduct = true;
      // alert(this.SingleProduct);
      this.TotalQuantity = data.ProductData.Products[0].Quantity;
      this.TotalPrice = data.ProductData.Products[0].Price * this.TotalQuantity;
    }

    this.GrandTotal = this.TotalPrice + (this.TotalPrice * (18/100) + 300);

    this.CustomerCredentials = data.ProductData;
    console.log('Card Credentials From OnlinePayment');
    console.log(this.CustomerCredentials);
    console.log(this.GrandTotal);
  }

  TotalQuantity;

  TotalPrice;

  GrandTotal;

  CustomerCredentials: ProductFormData; // This will Send The Final Result To DataBase

  SingleProduct: Boolean = true;

  ShowCardDetails: Boolean = false;

  CardType: String;

  CardDetails: Payment;

  PaymentForm: FormGroup = new FormGroup({
    Name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    Number: new FormControl('', [
      Validators.required,
      Validators.minLength(12),
      Validators.maxLength(16),
    ]),
    Expire: new FormControl('', [Validators.required]),
    Cvv: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(3),
    ]),
  });

  SelectedCard(data) {
    this.ShowCardDetails = true;
    this.CardType = data.value;
  }

  PaymentSubmit() {
    this.CardDetails = {
      CardType: this.CardType,
      CardHolderName: this.PaymentForm.get(['Name'])?.value,
      CardNumber: this.PaymentForm.get(['Number'])?.value,
    };
    console.log(this.CardDetails);

    this.CustomerCredentials.CardDetails = this.CardDetails;
    console.log("Final OutPut Of Online Payment");
    console.log(this.CustomerCredentials);

    // Call Api Here
    alert("Payment Was SuccessFull");
  }

  getFormValidationErrors() {
    // alert("controlErrors");

    Object.keys(this.PaymentForm.controls).forEach((key) => {
      let controlErrors: ValidationErrors = this.PaymentForm.get(key)
        ?.errors as ValidationErrors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          //  console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }
}
