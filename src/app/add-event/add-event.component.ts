import { Router } from '@angular/router';
import { EventService } from './../services/event.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
  eventForm: FormGroup;

  constructor(private fb: FormBuilder, private eventService: EventService, private router: Router) { }

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  addEvent() {
    this.eventService.addEvent(this.eventForm.value).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/events']);
      },
      err => {
        console.log(err);
      });
  }
}
