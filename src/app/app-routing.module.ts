import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripFormComponent } from './components/trip-form/trip-form.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { TripsComponent } from './components/trips/trips.component';
import { SingleTripComponent } from './components/single-trip/single-trip.component';
import { TripHistoryComponent } from './components/trip-history/trip-history.component';

const routes: Routes = [
  {path: 'add-trip', component: TripFormComponent},
  {path: '', component: HomeComponent},
  {path: 'cart', component: CartComponent},
  {path: 'trips', component: TripsComponent},
  {path: 'trips/:id', component: SingleTripComponent},
  {path: 'history', component: TripHistoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 