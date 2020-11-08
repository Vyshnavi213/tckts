import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventsURL = "http://localhost:3000/api/events";
  private specialeventsURL = "http://localhost:3000/api/special";

  constructor(private http: HttpClient) { }

  getEvents() {
    return this.http.get<any>(this.eventsURL)
  }

  getSpecialEvents() {
    return this.http.get<any>(this.specialeventsURL)
  }
}
//getEvents returns the array of regular events and they returns the data as an observable