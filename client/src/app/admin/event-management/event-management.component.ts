import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClubEvent } from 'src/app/_models/event';
import { EventsService } from 'src/app/_services/events.service';

@Component({
  selector: 'app-event-management',
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.css']
})
export class EventManagementComponent implements OnInit {
  editForm: FormGroup;
  clubEvent : ClubEvent;
  eventCode : string;

  constructor(private eventService: EventsService, private toastr : ToastrService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  loadEvent() {
    return this.eventService.getEvent(this.eventCode).subscribe(theEvent => {
      this.clubEvent = theEvent;
      if (!this.clubEvent) {
        this.toastr.error("No event with this code found");
        return;
      }
      this.initializeForm();
    })
    
  }

  initializeForm() {
    this.editForm = this.fb.group({
      title: [this.clubEvent.title, Validators.required],
      purpose: [this.clubEvent.purpose, Validators.required],
      teamInCharge: [this.clubEvent.teamInCharge, Validators.required],
      postingDate: [this.clubEvent.postingDate, Validators.required],
      draftDeadline: [this.clubEvent.draftDeadline, Validators.required],
      specifications: [this.clubEvent.specifications, Validators.required],
      })
  }

  updateEvent() {
    this.clubEvent.title = this.editForm.value.title;
    this.clubEvent.purpose = this.editForm.value.purpose;
    this.clubEvent.teamInCharge = this.editForm.value.teamInCharge;
    this.clubEvent.postingDate = this.editForm.value.postingDate;
    this.clubEvent.draftDeadline = this.editForm.value.draftDeadline;
    this.clubEvent.specifications = this.editForm.value.specifications;

    console.log(this.clubEvent)

    this.eventService.updateEvent(this.clubEvent, this.eventCode).subscribe(() => {
      this.toastr.success('Event edited successfully');
      this.editForm.reset(this.clubEvent);
    }, error => {
      this.toastr.error('Problem editing event');
      console.log(error);
    })
  }
  
}
