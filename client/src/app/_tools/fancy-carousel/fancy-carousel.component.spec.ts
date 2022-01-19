import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FancyCarouselComponent } from './fancy-carousel.component';

describe('FancyCarouselComponent', () => {
  let component: FancyCarouselComponent;
  let fixture: ComponentFixture<FancyCarouselComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FancyCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FancyCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
