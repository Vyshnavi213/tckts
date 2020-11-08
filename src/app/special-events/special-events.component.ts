import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent implements OnInit {

  specialEvents = []
  myDate = new Date();
  date;
  day;

  constructor(private eventService: EventService, private router: Router, private datePipe: DatePipe, private dialog: MatDialog) {
    this.date = this.datePipe.transform(this.myDate, 'dd/MM/yyyy');
    //console.log(this.datePipe.transform(this.myDate, 'yyyy-MM-dd'));
    //console.log(this.date);
  }

  ngOnInit() {
    this.eventService.getSpecialEvents()
      .subscribe(
        res => this.specialEvents = res,
        err => {
          //console.log(err)
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/login'])
            }
          }
        }
      )

    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    weekday[7] = "Sunday";

    var d = new Date();
    var n = d.getDay();
    this.day = weekday[n];
    // console.log(this.day);
    // console.log(weekday[n]);
  }

  added() {
    alert("Added to cart successfully");
  }

  openAlertDialog() {
    console.log("Hello World")
    const dialogRef = this.dialog.open(CartComponent, {
      panelClass: 'my-centered-dialog',
      height: "400px",
      width: "400px",
      data: {
        message: 'HelloWorld',
        buttonText: {
          cancel: 'Done'
        }
      },
    });
  }
}