import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  loader: boolean = false;
  signinForm: FormGroup = new FormGroup({});
  eye: string = 'visibility';
  type: string = 'password';
  marga: string = '';

  constructor (private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }

  onSignin () {
    this.loader = true;
    this.apiService.connection('POST', 'master-signin', this.signinForm.value).subscribe({
      next: (response: UserInterface) => {
        this.apiService.saveToLocalStorage(response);
        this.router.navigate(['/home', 'homepage']);
      },
      error: ({ error }: HttpErrorResponse) => {
        this.loader = false;
        this.apiService.processErrorHttp(error.error);
      },
      complete: () => {
        this.loader = false;
      }
    });
  }

  onSetVisibility () {
    this.eye = this.eye === 'visibility_off' ? 'visibility' : 'visibility_off';
    this.type = this.eye === 'visibility_off' ? 'text' : 'password';
  }

}
