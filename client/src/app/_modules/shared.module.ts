import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import {TabsModule} from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FileUploadModule } from 'ng2-file-upload';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    NzButtonModule,
    TabsModule.forRoot(),
    NgxGalleryModule,
    CarouselModule.forRoot(),
    NzCarouselModule,
    FileUploadModule,
    BsDatepickerModule.forRoot(),
  ],
  exports: [
    BsDropdownModule,
    ToastrModule,
    NzButtonModule,
    TabsModule,
    NgxGalleryModule,
    CarouselModule,
    NzCarouselModule,
    FileUploadModule,
    BsDatepickerModule,
  ],
})
export class SharedModule { }
