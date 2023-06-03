import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Navbar/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './Footer/footer/footer.component';
import { BookComponent } from './Body/Books/book/book.component';
import { BookadminComponent } from './Admin/BooksAdmin/bookadmin/bookadmin.component';
// import "node_modules/bootstrap-icons/font/bootstrap-icons.css";
// import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import {HttpClientModule} from '@angular/common/http';
import { CompComponent } from './Body/Comp/comp/comp.component';
import { FashComponent } from './Body/Fash/fash/fash.component';
import { CartComponent } from './Body/Cart/cart/cart.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from '@angular/material/button';
import { CartbodyComponent } from './Body/Cart/cartbody/cartbody.component';
import { GridModule } from '@progress/kendo-angular-grid';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    BookComponent,
    BookadminComponent,
    CompComponent,
    FashComponent,
    CartComponent,
    CartbodyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    GridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
