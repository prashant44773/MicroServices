import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './Body/Books/book/book.component';
import { BookadminComponent } from './Admin/BooksAdmin/bookadmin/bookadmin.component';
import { CompComponent } from './Body/Comp/comp/comp.component';
import { FashComponent } from './Body/Fash/fash/fash.component';
import { CartComponent } from './Body/Cart/cart/cart.component';

const routes: Routes = [
    {path:'book' , component:BookComponent},
    {path:'comp' , component:CompComponent},
    {path:'fash' , component:FashComponent},
    {path:'cart' , component:CartComponent},
    {path:'bookadmin' , component:BookadminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
