import { Component } from '@angular/core';
import { AfterViewInit } from '@angular/core';
declare var bootstrap: any;


@Component({
  selector: 'app-banner',
  imports: [],
  templateUrl: './banner.html',
  styleUrl: './banner.css',
})
export class Banner implements AfterViewInit {
  ngAfterViewInit() {
    const myCarousel = document.querySelector('#demo');
    if (myCarousel) {
      new bootstrap.Carousel(myCarousel, {
        interval: 3500,
        ride: 'carousel',
        pause: false
      });
    }
  }
}

