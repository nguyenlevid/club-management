import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ClubEvent } from '../_models/event';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  baseurl = environment.apiUrl;
  clubEvents: ClubEvent[] = [];

  constructor(private http: HttpClient) { }

  getEvents() {
    if (this.clubEvents.length > 0) return of(this.clubEvents);
    return this.http.get<ClubEvent[]>(this.baseurl + 'events').pipe(
      map(clubEvents => {
        this.clubEvents = clubEvents;
        return clubEvents;
      })
    )
  }

  getEvent(eventCode: string) {
    const clubEvent = this.clubEvents.find(x => x.eventCode === eventCode);
    if (clubEvent !== undefined) return of(clubEvent);
    return this.http.get<ClubEvent>(this.baseurl + 'events/' + eventCode);
  }

  updateEvent(clubEvent: ClubEvent, code: string) {
    return this.http.put(this.baseurl + 'events/' + code, clubEvent).pipe(
      map(() => {
        const index = this.clubEvents.indexOf(clubEvent);
        this.clubEvents[index] = clubEvent;
      })
    )
  }
}
