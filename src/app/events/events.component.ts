import { Router } from '@angular/router';
import { EventService } from './../services/event.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events: [];

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(
      res => this.events = res,
      err => console.log(err)
    );
  }

  removeEvent(id: number) {
    this.eventService.removeEvent(id).subscribe(
      res => {
        console.log(res);
        location.reload();
      },
      err => {
        console.log(err);
      });
  }
}
