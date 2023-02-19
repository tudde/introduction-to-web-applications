import { Injectable } from '@angular/core';
import {Trip} from "../../Trip"
import data from "../../assets/trips.json"
@Injectable({
  providedIn: 'root'
})
export class TripsService {

  constructor() { }
  
  trips: Trip[]= data.trips;
  reservedTrips = new Map<Trip,number>();//for each trip stores the number of reserved trips of that type

  totalReserved: number = 0;
  totalPrice: number = 0;


  
  getTripByID(id:number):Trip{
    for(let t of this.trips){
      if(t.id ==id){
        return t;
      }
    }
    return null
  }

  getReservedByTrip(trip: Trip):number{
    return this.reservedTrips.get(trip);
  }
  

  

  updateTotalReserved():void{
    let sum=0;
    for (let value of this.reservedTrips.values()) {
      sum+=value;               
    }  
    this.totalReserved=sum;  
  }

  updateTotalPrice():void{
    let sum=0;
    for (let entry of this.reservedTrips.entries()) {
      sum+=entry[1]*entry[0].price;               
    }  
    this.totalPrice =sum;
  }

  addReservation(trip:Trip): void{
    if (this.reservedTrips.has(trip)) 
      this.reservedTrips.set(trip,this.reservedTrips.get(trip)+1);
    else
      this.reservedTrips.set(trip,1);
    this.updateTotalReserved();
    this.updateTotalPrice();
  }

  removeReservation(trip: Trip): void{
    if (this.reservedTrips.has(trip) && this.reservedTrips.get(trip) > 1)
      this.reservedTrips.set(trip,this.reservedTrips.get(trip)-1);
    else
      this.reservedTrips.delete(trip)   
    this.updateTotalReserved();
    this.updateTotalPrice();
  }

  getTrips(): Trip[]{
    return this.trips;
  }

  getNextId(): number{
    let maxid: number = -1;
    for(let t of this.trips){
        maxid = Math.max(t.id,maxid);
    }
    return maxid+1;
  }
 
  deleteTrip(toDelete:Trip): void{
    this.reservedTrips.delete(toDelete);

    const i = this.trips.indexOf(toDelete);
    this.trips.splice(i,1);
    
    this.updateTotalReserved();
    this.updateTotalPrice();
  }

  addTrip(toAdd: Trip): void{
    this.trips.push(toAdd);
  }


}
