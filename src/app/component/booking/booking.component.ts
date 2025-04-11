import { Component,OnInit  } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {
  bookings: any[] = [];

  ngOnInit(): void {
    const stored = localStorage.getItem('bookings');
    this.bookings = stored ? JSON.parse(stored) : [];
  }

  cancelBooking(id: string) {
    this.bookings = this.bookings.filter(b => b.id !== id);
    localStorage.setItem('bookings', JSON.stringify(this.bookings));
  }
}
