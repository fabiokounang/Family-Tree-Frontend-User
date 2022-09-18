import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ChildrenOutletContexts } from '@angular/router';
import { slideInAnimation } from 'src/app/animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  // animations: [slideInAnimation]
})

export class HomeComponent implements OnInit {

  modeSide: any = 'side';
  open: boolean = true;
  userRole: any = null;
  username: string = '';
  
  constructor (private contexts: ChildrenOutletContexts) {}

  ngOnInit() {
    this.onResize();
    // this.userRole = this.sharedService.getLocalStorageRole();
    this.username = localStorage.getItem('username') || '';
  }


  onToggle (sidenav: MatSidenav) {
    if (window.innerWidth <= 992) sidenav.toggle();
  }

  onToggleButton (sidenav: MatSidenav) {
    sidenav.toggle();
  }

  onLogout (sidenav: MatSidenav) {
    // this.apiService.removeLocalStorage();
  }

  onResize() {
    this.modeSide = window.innerWidth <= 992 ? 'over' : 'side';
    this.open = window.innerWidth <= 992 ? false : true;
  }

  getRouteAnimationData (outlet) {
    return outlet._activatedRoute ? outlet._activatedRoute.url._value.join('/') : 'void';
  }
}
