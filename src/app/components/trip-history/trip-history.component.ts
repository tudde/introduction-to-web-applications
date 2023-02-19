import { Component } from '@angular/core';
import { TripHistoryService } from 'src/app/services/trip-history.service';
import { TripsService } from 'src/app/services/trips.service';
import { HistEntry } from 'src/HistEntry';
import { Trip } from 'src/Trip';




@Component({
  selector: 'app-trip-history',
  templateUrl: './trip-history.component.html',
  styleUrls: ['./trip-history.component.scss']
})
export class TripHistoryComponent {
  constructor(private tripHistoryService: TripHistoryService){}

  tripHistory=this.tripHistoryService.pastTrips;
  filteredHistory: HistEntry[];
  viewArchival=true;
  viewActive=true;
  viewWaiting=true;

  ngOnInit(){
    this.tripHistoryService.updateStatuses();
    this.updateFilters();
    
  }

  updateFilters(){
    this.filteredHistory=[]
    if(this.viewActive){
      for( let a of this.tripHistory){
        if(a.status=="active")
        this.filteredHistory.push(a)
      }
    }
    if(this.viewWaiting){
      for( let b of this.tripHistory){
        if(b.status=="waiting")
        this.filteredHistory.push(b)
      }
    }
    if(this.viewArchival){
      for( let c of this.tripHistory){
        if(c.status=="archival")
        this.filteredHistory.push(c)
      }
    }

  

  }

  changeActive(){
    this.viewActive= !this.viewActive;
    this.updateFilters();

  }

  changeWaiting(){
    this.viewWaiting= !this.viewWaiting;
    this.updateFilters();

  }
  changeArchival(){
    this.viewArchival= !this.viewArchival;
    this.updateFilters()

  }


 
  
  
  

}
