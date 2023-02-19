import { Component } from '@angular/core';
import { FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import {Trip} from "../../../Trip"
import { TripsService } from 'src/app/services/trips.service';
@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.scss']
})
export class TripFormComponent {
  newTrip: Trip;

  
  tripForm = new FormGroup({
  name: new FormControl('',Validators.required),
  country:new FormControl('',Validators.required),
  description: new FormControl('',Validators.required),
  price: new FormControl('',Validators.compose([Validators.pattern('[0-9]*'),Validators.required])), //non negative
  startDate: new FormControl('',Validators.required),
  endDate: new FormControl('',Validators.required),
  maxPlaces:  new FormControl('',Validators.compose([Validators.pattern('[0-9]*'),Validators.required])),//non negative
  picture: new FormControl('',Validators.required), //nie mamy backendu a przydalaby sie opcja wstawiania wiec w sumie to pole nie ma sensu
  },{validators:this.dateValidator}) //startdate<enddate

  constructor(private tripsService: TripsService){}

  dateValidator(control: AbstractControl): { [s: string]: boolean } {
    const start = control.get('startDate');
    const end = control.get('endDate'); 
    return start.value !== null && end.value !== null && start.value < end.value 
    ? null :{ dateValid:true };
  } 




  submitTrip(): void{
    this.newTrip ={

      id: this.tripsService.getNextId(),
      name:this.tripForm.get('name').value, 
      country:this.tripForm.get('country').value, 
      startDate:this.tripForm.get('startDate').value, 
      endDate:this.tripForm.get('endDate').value, 
      price:+this.tripForm.get('price').value, 
      maxPlaces:+this.tripForm.get('maxPlaces').value,
      description:this.tripForm.get('description').value,
      pictures:[this.tripForm.get('picture').value],
      ratings: []
    }

    this.tripsService.addTrip(this.newTrip);



  }

}
