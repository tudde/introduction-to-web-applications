import { Component,Input,NgModule } from '@angular/core';
import {Trip} from "../../../Trip"
import { TripsService } from 'src/app/services/trips.service';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent {
  @Input() trip:Trip;
  @Input() isHighest:boolean=false;
  @Input() isLowest:boolean=false;
  borderColor:string='transparent';
  reserved: number=0;
  leftMsg: string="";
  
  reservedTrips=this.tripsService.reservedTrips;

  

  constructor(private tripsService: TripsService){}


  ngOnInit(): void{
    if(this.reservedTrips.has(this.trip)){
      this.reserved=this.reservedTrips.get(this.trip);
    }

    this.leftMsg="left: "+ (this.trip.maxPlaces-this.reserved);
    if(this.trip.ratings.length>0)
    if(this.trip.maxPlaces==this.reserved) this.leftMsg="out of stock";
  }

  ngOnChanges():void{
    this.updateConditionals();
  }
  

  updateConditionals():void{
    if(this.isHighest) this.borderColor="#ed5c5a";
    else if(this.isLowest) this.borderColor="#4d7c8a";
    else this.borderColor="transparent"

  }

  subtractReservation(){
    if(this.reserved>0){
      this.tripsService.removeReservation(this.trip);
    }

    if (this.reservedTrips.has(this.trip)){
    this.reserved=this.reservedTrips.get(this.trip);
    }
    else this.reserved = 0;

    this.leftMsg="left: "+ (this.trip.maxPlaces-this.reserved);
  }
  
  addReservation(){
    if(this.trip.maxPlaces>this.reserved){
      this.tripsService.addReservation(this.trip);
    }
    this.reserved=this.reservedTrips.get(this.trip);
    this.leftMsg="left: "+ (this.trip.maxPlaces-this.reserved);
    if(this.trip.maxPlaces==this.reserved) this.leftMsg="out of stock";
  }

  deleteTrip():void{
    this.tripsService.deleteTrip(this.trip);
  }

  
  
  
  // addToRating(e):void{
  //  if(!this.rated){
  //   this.localRating=e;
  //   this.tripsService.addToRating(this.trip,+e);
  //   this.tripRating=this.tripsService.ratings.get(this.trip)[0]
    
  //   this.rated=true;
  // }

  // }

}
