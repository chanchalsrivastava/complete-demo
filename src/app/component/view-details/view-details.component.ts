import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/auth/event.service';
import { Event } from 'src/app/module/event/event.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent implements OnInit {
  event!: Event;
  bookingForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const found = this.eventService.getEvents().find(e => e.id === id);
    
    if (found) {
      this.event = found;
    } else {
      alert('Event not found!');
      return;
    }

    this.bookingForm = this.fb.group({
      name: ['', Validators.required],
      seats: [1, [Validators.required, Validators.min(1)]]
    });
  }

  book() {
    const { name, seats } = this.bookingForm.value;

    if (this.bookingForm.invalid) {
      alert('Please enter your name and valid number of seats.');
      return;
    }

    if (seats > this.event.availableSeats) {
      alert(`Only ${this.event.availableSeats} seat(s) left!`);
      return;
    }

    this.event.availableSeats -= seats;
    this.eventService.updateEvent(this.event);
    
    alert(`Booking Confirmed for ${name}!`);
    this.bookingForm.reset({ name: '', seats: 1 });
  }
}
