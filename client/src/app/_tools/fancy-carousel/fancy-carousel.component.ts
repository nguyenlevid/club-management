import { Component, Input, OnInit } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';


import { ClubEvent } from 'src/app/_models/event';
import { EventPhoto } from 'src/app/_models/eventPhoto';

@Component({
  selector: 'app-fancy-carousel',
  templateUrl: './fancy-carousel.component.html',
  styleUrls: ['./fancy-carousel.component.css']
})
export class FancyCarouselComponent implements OnInit {
  @Input() clubEvent: ClubEvent;
  @Input() eventPhotos: EventPhoto[];

  constructor() { }

  ngOnInit(): void {
  }

}
