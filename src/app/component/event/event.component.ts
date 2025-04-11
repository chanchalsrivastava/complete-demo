// src/app/components/event/event.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from 'src/app/auth/event.service';
import { Event } from 'src/app/module/event/event.module';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  eventForm!: FormGroup;
  isEditing = false;
  editingId: number | null = null;

  events: Event[] = [];
  filteredEvents: Event[] = [];
  paginatedEvents: Event[] = [];

  pageSize = 5;
  currentPage = 0;

  searchQuery = '';
  filterLocation = '';
  sortBy = 'date';

  uniqueLocations: string[] = [];

  constructor(private eventService: EventService, private fb: FormBuilder) {}

  ngOnInit() {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      date: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      availableSeats: [1, [Validators.required, Validators.min(1)]],
    });

    this.loadEvents();
  }

  loadEvents() {
    this.events = this.eventService.getEvents();
    this.uniqueLocations = [...new Set(this.events.map(e => e.location))];
    this.applyFilters();
  }

  applyFilters() {
    let result = [...this.events];

    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(e =>
        e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q)
      );
    }

    if (this.filterLocation) {
      result = result.filter(e => e.location === this.filterLocation);
    }

    if (this.sortBy === 'date') {
      result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (this.sortBy === 'price') {
      result.sort((a, b) => a.price - b.price);
    }

    this.filteredEvents = result;
    this.setPage(0);
  }

  setPage(page: number) {
    this.currentPage = page;
    const start = page * this.pageSize;
    this.paginatedEvents = this.filteredEvents.slice(start, start + this.pageSize);
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.setPage(event.pageIndex);
  }

  submit() {
    if (this.eventForm.invalid) return;

    const formValue = this.eventForm.value;
    const event: Event = {
      id: this.isEditing && this.editingId !== null ? this.editingId : Date.now(),
      ...formValue
    };

    if (this.isEditing) {
      this.eventService.updateEvent(event);
    } else {
      this.eventService.addEvent(event);
    }

    this.cancelEdit();
    this.loadEvents();
  }

  edit(event: Event) {
    const formattedDate = new Date(event.date).toISOString().substring(0, 10);
    this.eventForm.patchValue({ ...event, date: formattedDate });
    this.isEditing = true;
    this.editingId = event.id;
  }

  delete(id: number) {
    if (confirm('Delete this event?')) {
      this.eventService.deleteEvent(id);
      this.loadEvents();
    }
  }

  cancelEdit() {
    this.eventForm.reset();
    this.isEditing = false;
    this.editingId = null;
  }
}
