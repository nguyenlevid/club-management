import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { ClubEvent } from 'src/app/_models/event';
import { EventsService } from 'src/app/_services/events.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  clubEvent: ClubEvent;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private eventService: EventsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadEvent()

    // this.galleryOptions = [
    //   {
    //     width: '700px',
    //     height: '500px',
    //     imagePercent: 100,
    //     thumbnailsColumns: 4,
    //     imageAnimation: NgxGalleryAnimation.Slide,
    //     preview: false
    //   }
    // ]
  }

  getImages(): NgxGalleryImage[] {
    const imageUrls = [];
    for (const photo of this.clubEvent.photos) {
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url,
      })
    }
    return imageUrls;
  }

  loadEvent() {
    this.eventService.getEvent(this.route.snapshot.paramMap.get("eventCode")).subscribe(clubEvent => {
      this.clubEvent = clubEvent;
      this.galleryImages = this.getImages();
    })
  }

}
