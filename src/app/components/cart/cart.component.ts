import { Component } from '@angular/core';
import {Trip} from "../../../Trip"
import { TripsService } from 'src/app/services/trips.service';
import { TripHistoryService } from 'src/app/services/trip-history.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  constructor(private tripsService: TripsService, private tripHistoryService: TripHistoryService){}
  //reservedTrips = this.tripsService.getReservedTrips();

  get reservedTrips(): Map<Trip,number>{
    return this.tripsService.reservedTrips;
  }

  get getReservedTrips(){
    return Array.from(this.reservedTrips.entries());
  }

  

  



  get totalPrice(): number{
    return this.tripsService.totalPrice;
  }
  get totalReserved(): number{
    return this.tripsService.totalReserved;
  }

  buyTrip(trip: Trip, tickets: number): void{
    
    this.tripHistoryService.addToHistory(trip,tickets);
    trip.maxPlaces-=tickets;
    this.reservedTrips.delete(trip);
    this.tripsService.updateTotalPrice();
    this.tripsService.updateTotalReserved();

  }


  



}
