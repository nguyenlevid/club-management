import { Component, Input, OnInit } from '@angular/core';
import { ClubEvent } from 'src/app/_models/event';

@Component({
  selector: 'app-eventphoto-editor',
  templateUrl: './eventphoto-editor.component.html',
  styleUrls: ['./eventphoto-editor.component.css']
})
export class EventphotoEditorComponent implements OnInit {
  @Input() clubEvent: ClubEvent;

  constructor() { }

  ngOnInit(): void {
  }

}
