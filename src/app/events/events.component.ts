import { AuthService } from './../services/auth.service';
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
  isLoggedIn: boolean;

  constructor(private eventService: EventService, private auth: AuthService) { }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(
      res => this.events = res,
      err => console.log(err)
    );

    this.auth.isLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
  }

  removeEvent(id: string) {
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
