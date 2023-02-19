import { Injectable } from '@angular/core';
import { HistEntry } from 'src/HistEntry';
import { Trip } from 'src/Trip';

@Injectable({
  providedIn: 'root'
})
export class TripHistoryService {

  constructor() { }

  pastTrips: HistEntry[]=[];


  addToHistory(trip: Trip, tickets: number): void{

    


  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); 
  let yyyy = today.getFullYear();

  let stoday = yyyy + '-' + mm + '-' + dd;

    const newEntry: HistEntry = {
      "id": trip.id,
      "name": trip.name,
      "startDate": trip.startDate,
      "endDate": trip.endDate,
      "buyDate": stoday,
      "tickets": tickets,
      "status": "waiting",
    }
    this.pastTrips.push(newEntry);
  }


  updateStatuses(){
    let today = new Date();
    
    for(let h of this.pastTrips){
      let begin = new Date(h.startDate)
      let end = new Date(h.endDate)
      let status = "waiting"
      if(today>=begin){
        if(today<=end){
          status = "active"
        }
        else{
          status="archival"
        }
      }
      h.status=status;

    }
  }


}
