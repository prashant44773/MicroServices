import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './Body/Books/book/book.component';
import { BookadminComponent } from './Admin/BooksAdmin/bookadmin/bookadmin.component';

const routes: Routes = [
    {path:'book' , component:BookComponent},
    {path:'bookadmin' , component:BookadminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
