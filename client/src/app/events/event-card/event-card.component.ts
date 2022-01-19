import { Component, Input, OnInit } from '@angular/core';
import { ClubEvent } from 'src/app/_models/event';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {
  @Input() clubEvent: ClubEvent;

  constructor() { }

  ngOnInit(): void {
  }

}
