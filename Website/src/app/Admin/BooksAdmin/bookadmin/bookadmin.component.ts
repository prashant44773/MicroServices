import { Component } from '@angular/core';
import {FormGroup , FormControl} from '@angular/forms';
import {BookadminserviceService} from './bookadminservice.service';
import { PostData } from './PostModel';

@Component({
  selector: 'app-bookadmin',
  templateUrl: './bookadmin.component.html',
  styleUrls: ['./bookadmin.component.css']
})
export class BookadminComponent {

  constructor(private Api : BookadminserviceService){
  }

  Image:any = null;

  bookProduct = new  FormGroup({
    title: new FormControl(''),
    desc: new FormControl(''),
    price: new FormControl('')
  });

  UploadFile(event:any){
    alert("File is Loading");
    let file = event.target.files[0];
    console.log(this.Image);

    // console.log("Base64");
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        console.log(reader.result);
        this.Image = reader.result;
    };
  };

  Submit(){
    // alert("Collecting Form Data");

    let Post:PostData = {
        Title : this.bookProduct.get('title')?.value,
        Description:this.bookProduct.get('desc')?.value,
        Price:this.bookProduct.get('price')?.value,
        Image:this.Image
    };

    console.log(Post);
    alert("Check Data");

    this.Api.AddBookApi(Post).subscribe((res:any)=>{
        console.log(res);
    });

    this.bookProduct.reset();
    this.Image = null;
  };

}
