import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from './sign-in/sign-in.component';
import {CarsTableComponent} from './cars-table/cars-table.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'cars', component: CarsTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


