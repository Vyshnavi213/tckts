import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events = []
  myDate = new Date();
  date;
  constructor(private eventService: EventService, private datePipe: DatePipe) { 
    
    this.date = this.datePipe.transform(this.myDate, 'dd/MM/yyyy');
    //console.log(this.datePipe.transform(this.myDate, 'yyyy-MM-dd'));
    //console.log(this.date);
  }
  
  ngOnInit() {
   
    this.eventService.getEvents()
      .subscribe(
        res => this.events = res,
        err => console.log(err)
      )
      
  }
}