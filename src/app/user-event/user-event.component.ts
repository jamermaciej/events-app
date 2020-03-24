import { Observable } from 'rxjs';
import { EventService } from './../services/event.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-event',
  templateUrl: './user-event.component.html',
  styleUrls: ['./user-event.component.scss']
})
export class UserEventComponent implements OnInit {
  events: Observable<any>;

  constructor(private eventService: EventService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    this.events = this.eventService.getEvent(userId);
  }

  removeEvent(id: string) {
    this.eventService.removeEvent(id).subscribe(() => location.reload());
  }
}
