import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatCalendar, MatCalendarCellClassFunction, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CalendarEventComponent } from 'src/app/dialog/calendar-event/calendar-event.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  selectedDate: any = null;
  selectedCalendar: any = null;
  month = new Date().getMonth() + 1;
  objectKeys = Object.keys;
  calendar: any = null;
  user: any = null;
  themes: any[] = [];
  theme: any = null;
  loader: boolean = false;
  color: string = '#FFFFFF';
  text: string = '#FFFFFF';
  emptyDay: any = [];
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
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  constructor (private apiService: ApiService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.user = {
      username: this.apiService.getLocalStorageUsername(),
      latin_name: this.apiService.getLocalStorageLatin(),
      chinese_name: this.apiService.getLocalStorageChinese(),
      no_anggota: this.apiService.getLocalStorageNoAnggota()
    }
    
    this.getThemes();
    this.getCalendar();
  }

  getThemes () {
    this.apiService.connection('POST', 'master-theme').subscribe({
      next: (response: any) => {
        this.themes = response.values.map((val) => {
          return {
            id: val._id,
            name: val.theme,
            color: val.color,
            text: val.text
          }
        });
        this.fillData();
      }, 
      error: ({ error }: HttpErrorResponse) => {
        this.loader = false;
        this.apiService.processErrorHttp(!error.error ? error : error.error);
      },
      complete: () => {
        this.loader = false;
      }
    });
  }

  getCalendar () {
    this.apiService.connection('POST', 'master-calendar-active').subscribe({
      next: (response: any) => {
        this.calendar = response.value;
        const year = new Date().getFullYear();
        const d = `${this.months[this.month - 1]} 1, ${year} 00:00:01`;
        const day = new Date(d).getDay();
        this.emptyDay = Array.from(Array(day).keys());
      }, 
      error: ({ error }: HttpErrorResponse) => {
        this.loader = false;
        this.apiService.processErrorHttp(!error.error ? error : error.error);
      },
      complete: () => {
        this.loader = false;
      }
    });
  }

  onSelectTheme (event) {
    this.apiService.connection('POST', 'master-theme-user', { theme: event.value }).subscribe({
      next: (response: any) => {
        localStorage.setItem('theme', event.value);
        this.fillData();
      }, 
      error: ({ error }: HttpErrorResponse) => {
        this.loader = false;
        this.apiService.processErrorHttp(!error.error ? error : error.error);
      },
      complete: () => {
        this.loader = false;
      }
    });
  }

  fillData () {
    this.theme = this.apiService.getLocalStorageTheme();
    const theme = this.themes.find(val => val.id == this.theme);
    this.color = theme.color;
    this.text = theme.text;
  }

  onOpenFormEvent (calendar, month, day) {
    if (calendar.calendar[month][day] && calendar.calendar[month][day].length > 0) {
      this.dialog.open(CalendarEventComponent, {
        width: '900px',
        data: calendar.calendar[month][day]
      })
    } else {
      this.apiService.callSnack('No event', 'Dismiss');
    }
  }

  changeMonth (num: number) {
    if (this.month + num > 0 && this.month + num <= 12) this.month = this.month + num;
  }

}
