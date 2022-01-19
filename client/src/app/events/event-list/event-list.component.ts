import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ClubEvent } from 'src/app/_models/event';
import { EventsService } from 'src/app/_services/events.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  clubEvents$: Observable<ClubEvent[]>

  constructor(private eventService: EventsService) { }

  ngOnInit(): void {
    this.clubEvents$ = this.eventService.getEvents();
  }

}
