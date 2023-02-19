import { Component } from '@angular/core';
import {Trip} from "../../../Trip"
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private tripsService: TripsService){ }
    get totalReserved():number{
    return this.tripsService.totalReserved;
  }

  get totalPrice(): number{
    return this.tripsService.totalPrice;
  }
  


}
