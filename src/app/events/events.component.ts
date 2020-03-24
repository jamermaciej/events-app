import { AuthService } from './../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from './../services/event.service';
import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events: [];
  isLoggedIn: boolean;

  constructor(private eventService: EventService, private auth: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.auth.isLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);

    const userId = this.route.snapshot.paramMap.get('id');
    if ( userId ) {
      this.eventService.getEvent(userId).subscribe(events => this.events = events);
    } else {
      this.eventService.getEvents().subscribe(events => this.events = events);
    }
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
