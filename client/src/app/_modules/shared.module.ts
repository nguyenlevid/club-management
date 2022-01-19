import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {TabsModule} from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { CarouselModule } from 'ngx-bootstrap/carousel'



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
  ],
  exports: [
    BsDropdownModule,
    ToastrModule,
    NzButtonModule,
    TabsModule,
    NgxGalleryModule,
    CarouselModule
  ],
})
export class SharedModule { }
