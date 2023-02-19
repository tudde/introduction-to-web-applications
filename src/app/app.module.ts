import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TripsComponent } from './components/trips/trips.component';
import { TripComponent } from './components/trip/trip.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CartComponent } from './components/cart/cart.component';
import { TripFormComponent } from './components/trip-form/trip-form.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SingleTripComponent } from './components/single-trip/single-trip.component';
import { RateTripComponent } from './components/rate-trip/rate-trip.component';
import { TripHistoryComponent } from './components/trip-history/trip-history.component';


export const appRoutes: Routes = [
  {path: 'add-trip', component: TripFormComponent},
]

RouterModule.forRoot(appRoutes);

@NgModule({
  declarations: [
    AppComponent,
    TripsComponent,
    TripComponent,
    SidebarComponent,
    CartComponent,
    TripFormComponent,
    HomeComponent,
    SingleTripComponent,
    RateTripComponent,
    TripHistoryComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})




export class AppModule { }
