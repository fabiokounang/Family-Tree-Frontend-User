import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor (private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogout () {
    this.apiService.removeLocalStorage();
    this.router.navigate(['/']);
  }

}
