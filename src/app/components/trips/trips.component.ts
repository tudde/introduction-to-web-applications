import { Component } from '@angular/core';
import {Trip} from "../../../Trip"
import { TripsService } from 'src/app/services/trips.service';


@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent {
  highestPrice: number = 0;
  lowestPrice: number = Number.MAX_SAFE_INTEGER;
  trips: Trip[]= this.tripsService.getTrips();
  reservedTrips = new Map<Trip,number>();
  
  constructor(private tripsService: TripsService){ }

  get tripss(): Trip[]{
    this.updatePrices();
    return this.tripsService.trips;
  }

  onclick(): void{
    console.log("aa");
    this.trips[2].price=12456;
    this.updatePrices();
    this.trips=this.tripsService.getTrips();
    this.updatePrices();
  }

 

  ngOnInit(): void{ 
    this.updatePrices();
  }

  updatePrices(): void{
    this.highestPrice=0;
    this.lowestPrice=Number.MAX_SAFE_INTEGER;
    for(let t of this.trips){
      this.highestPrice=Math.max(this.highestPrice,t.price);
      this.lowestPrice=Math.min(this.lowestPrice,t.price);
    }

  

  }

}
