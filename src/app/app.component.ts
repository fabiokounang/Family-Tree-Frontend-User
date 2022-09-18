import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { SwPush } from "@angular/service-worker";
import { slideInAnimation } from './animation';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly VAPID_PUBLIC_KEY = "BBYTTR9ngweTw_5UgiZrSBgAlC2IbpxSj83xTPr1FPQLicu4KJpgoMOdSa_xoFzHZB1kNyjdMPwdF7SCz6IdiTU";

  constructor(private swPush: SwPush, private apiService: ApiService) {}

  ngOnInit(): void {
    if ('serviceWorker' in navigator) {
      try {
        console.log('Service worker active');
        this.subscribeToNotifications();
      } catch (error) {
        console.log(error);
      }
    }
  }

  subscribeToNotifications() {
    console.log('masuk sini kah ?');
    this.swPush.requestSubscription({ serverPublicKey: this.VAPID_PUBLIC_KEY}).then(sub => {
      this.apiService.connection('POST', 'https://frozen-fortress-78679.herokuapp.com/api/broadcast/subscribe', sub).subscribe({
        next: (response: any) => {
          console.log(response, 'response');
        },
        error: (error: HttpErrorResponse) => {
          console.log(error, 'error')
        }
      })
    }).catch(err => console.error("Could not subscribe to notifications", err));
  }

  requestSubscription = () => {
    if (!this.swPush.isEnabled) {
      console.log("Notification is not enabled.");
      return;
    }

    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    }).then((_) => {
      console.log('done', _);
    }).catch((error) => console.log(error));
  };
}
