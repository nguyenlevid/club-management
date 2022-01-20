import { Component, OnInit } from '@angular/core';
import { EventPhoto } from '../_models/eventPhoto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;

  eventPhotos : EventPhoto[] = [
    {
      id : 111,
      url : "/assets/events/tucano.jpg",
      isMain : true
    },
    {
      id : 222,
      url : "/assets/events/gdsc.png",
      isMain : true
    },
    {
      id : 333,
      url : "/assets/events/book.jpg",
      isMain : true
    },
    {
      id : 444,
      url : "/assets/events/marcom.png",
      isMain : true
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }


  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }
}
