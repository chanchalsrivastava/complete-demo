// src/app/services/event.service.ts
import { Injectable } from '@angular/core';
import { Event } from '../module/event/event.module';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private storageKey = 'events';

  constructor() {
    const exists = localStorage.getItem(this.storageKey);
    if (!exists) {
      this.saveEvents([]); // init
    }
  }

  getEvents(): Event[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  addEvent(event: Event) {
    const events = this.getEvents();
    event.id = Date.now();
    events.push(event);
    this.saveEvents(events);
  }

  updateEvent(event: Event) {
    const events = this.getEvents().map(e => (e.id === event.id ? event : e));
    this.saveEvents(events);
  }

  deleteEvent(id: number) {
    const events = this.getEvents().filter(e => e.id !== id);
    this.saveEvents(events);
  }

  private saveEvents(events: Event[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(events));
  }
}
