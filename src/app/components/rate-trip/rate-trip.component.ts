import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, AbstractControl, MinValidator } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CommentsService } from 'src/app/services/comments.service';
import { Opinion } from 'src/Opinion';
import { Trip } from 'src/Trip';


@Component({
  selector: 'app-rate-trip',
  templateUrl: './rate-trip.component.html',
  styleUrls: ['./rate-trip.component.scss']
})
export class RateTripComponent {

  @Input() trip: Trip;
  
  opinions: Opinion[] = this.commentsService.comments;



  opinionForm = new FormGroup({
    username: new FormControl('',Validators.required),
    comment:new FormControl('',Validators.compose([Validators.maxLength(500),Validators.minLength(50),Validators.required])),
    trip: new FormControl('',Validators.required),
    date: new FormControl('')
    })


  constructor(private commentsService: CommentsService){};

  ngOnInit(){
    this.opinionForm.patchValue({ trip: this.trip.name });

  }

  get username() { return this.opinionForm.get('userName'); }

  
  submitOpinion(){
    
    let date = this.opinionForm.get('date').value
    if(date=='')
    date="-"

    let newOpinion: Opinion={
      "tripId": this.trip.id,
      "opinionId": this.commentsService.getNextId(),
      "username": this.opinionForm.get('username').value,
      "trip": this.opinionForm.get('trip').value,
      "comment": this.opinionForm.get('comment').value,
      "date": date

      


    }
    
    this.commentsService.comments.push(newOpinion);
    this.opinionForm.reset();
    this.opinionForm.patchValue({ trip: this.trip.name });

  }

}
