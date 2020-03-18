import { EventService } from './../services/event.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.scss']
})
export class SpecialEventsComponent implements OnInit {
  speciaEvents = [];

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.getSpecialEvents().subscribe(
      res => this.speciaEvents = res,
      err => console.log(err)
    );
  }

}
