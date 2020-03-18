import { EventService } from './../services/event.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.scss']
})
export class SpecialEventsComponent implements OnInit {
  specialEvents = [];

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.getSpecialEvents().subscribe(
      res => this.specialEvents = res,
      err => console.log(err)
    );
  }

}
