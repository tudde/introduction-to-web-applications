import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TripsService } from 'src/app/services/trips.service';
import { Trip } from 'src/Trip';
@Component({
  selector: 'app-single-trip',
  templateUrl: './single-trip.component.html',
  styleUrls: ['./single-trip.component.scss']
})
export class SingleTripComponent {

  constructor(private route: ActivatedRoute, private tripsService: TripsService){};
  private subscription: Subscription | undefined
  id: number;
  trip: Trip;
  reserved:number=0;
  leftMsg: string="";
  
  tripRating: any="no rating";
  localRating:number=0;
  rated: boolean=false;
  reservedTrips = this.tripsService.reservedTrips;
  currentPhoto: number = 0;

  ngAfterContentInit():void{
    if(this.reservedTrips.has(this.trip)){
      this.reserved=this.reservedTrips.get(this.trip);
      this.leftMsg="left: "+ (this.trip.maxPlaces-this.reserved);
      if(this.trip.maxPlaces==this.reserved) this.leftMsg="out of stock";

    }
    
  }
  
  ngOnInit(): void {
    
    this.subscription = this.route.params.subscribe(params => {
          this.id = params['id']
        })
        
        this.trip=this.tripsService.getTripByID(this.id);
        this.leftMsg="left: "+ (this.trip.maxPlaces-this.reserved);
        this.updateAverageRating();
    }

  nextPhoto(): void{
    if(this.currentPhoto>=this.trip.pictures.length-1){
      this.currentPhoto=0;
    }
    else this.currentPhoto+=1
  }

  prevPhoto(): void{
    if(this.currentPhoto<=0){
      this.currentPhoto=this.trip.pictures.length-1;
    }
    else this.currentPhoto-=1
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

  addToRating(r):void{
    if(!this.rated){
      this.localRating=r;
      this.rated=true;
      this.trip.ratings.push(r);
      this.updateAverageRating();
    }

  }

  updateAverageRating():void{
    let sum=0;
    for(let r of this.trip.ratings){
      sum+=r;
      this.tripRating=sum/this.trip.ratings.length;
    }
  }
    

  

}
