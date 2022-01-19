import { Component, Input, OnInit } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';


import { ClubEvent } from 'src/app/_models/event';
import { EventPhoto } from 'src/app/_models/eventPhoto';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 3500, noPause: true, showIndicators: true } }
  ]
})
export class CarouselComponent implements OnInit {
  @Input() clubEvent: ClubEvent;
  @Input() eventPhotos: EventPhoto[];

  constructor() { }

  ngOnInit(): void {
  }

}
