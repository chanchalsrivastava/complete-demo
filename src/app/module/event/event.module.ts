// src/app/models/event.model.ts
export interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  price: number;
  availableSeats: number;
}
