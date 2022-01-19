import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClubEvent } from 'src/app/_models/event';
import { EventsService } from 'src/app/_services/events.service';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  @Input() clubEvent: ClubEvent;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private eventService: EventsService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  updateEvent() {
    this.eventService.updateEvent(this.clubEvent, this.clubEvent.eventCode).subscribe(() => {
      this.toastr.success('Event updated successfully');
      this.editForm.reset(this.clubEvent);
    })
  }

}
