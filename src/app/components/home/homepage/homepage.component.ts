import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  selectedCalendar: any = null;
  dynamicSlides = [
    {
      id: '1',
      src:'https://getstencil.com/templates/tmplylbf4tyc/download',
      alt:'Side 1',
      title:'Side 1'
    },
    {
      id: '2',
      src:'https://getstencil.com/templates/tmplylbf4tyc/download',
      alt:'Side 2',
      title:'Side 2'
    },
    {
      id: '3',
      src:'https://getstencil.com/templates/tmplylbf4tyc/download',
      alt:'Side 3',
      title:'Side 3'
    },
    {
      id: '4',
      src:'https://getstencil.com/templates/tmplylbf4tyc/download',
      alt:'Side 4',
      title:'Side 4'
    },
    {
      id: '5',
      src:'https://getstencil.com/templates/tmplylbf4tyc/download',
      alt:'Side 5',
      title:'Side 5'
    }
  ]
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    mergeFit: true,
    autoWidth: true,
    dots: false,
    navSpeed: 600,
    navText: ["<div class='nav-btn prev-slide'></div>", "<div class='nav-btn prev-slide'></div>","<div class='nav-btn next-slide'></div>"],
    responsive: {
      0: {
        items: 1 
      },
      600: {
        items: 2 
      },
      800: {
        items: 2 
      }
    },
    nav: true
  }

  constructor() { }

  ngOnInit(): void {}

}
