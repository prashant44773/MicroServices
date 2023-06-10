import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-offlinepayment',
  templateUrl: './offlinepayment.component.html',
  styleUrls: ['./offlinepayment.component.css'],
})
export class OfflinepaymentComponent {

  constructor() {}

  ProductName = "Can't Hurt Me";

  TermsAndConditions: Boolean = false;

  ProductForm: FormGroup = new FormGroup({
      Name:new FormControl('',[Validators.required,Validators.minLength(3)]),
      LastName:new FormControl('',[Validators.required,Validators.minLength(3)]),
      Date:new FormControl('',[Validators.required]),
      Address:new FormControl('',[Validators.required,Validators.minLength(15)]),
      City:new FormControl('',[Validators.required,Validators.minLength(2)]),
      Region:new FormControl('',[Validators.required,Validators.minLength(2)]),
      Code:new FormControl('',[Validators.required,Validators.minLength(3)]),
      Country:new FormControl('',[Validators.required,Validators.minLength(2)])
  });


  Agreed() {
    if (this.TermsAndConditions) {
      this.TermsAndConditions = false;
    } else {
      this.TermsAndConditions = true;
    }
  }

  Submit(){

    // this.getFormValidationErrors();

    if(this.TermsAndConditions)
    {
      alert('Form Data');
      console.log(this.ProductForm.get(['Name'])?.value);
    }
    else{
      alert("Agree With Terms And Conditions By Click On Button")
    }
  }

  getFormValidationErrors() {
    // alert("controlErrors");

    Object.keys(this.ProductForm.controls).forEach(key => {
      let controlErrors : ValidationErrors = this.ProductForm.get(key)?.errors as ValidationErrors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
        //  console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }
}
