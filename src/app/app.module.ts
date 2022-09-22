import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { AppComponent } from './app.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { MaterialModule } from './material.module';
import { HomeComponent } from './components/home/home.component';
import { HomepageComponent } from './components/home/homepage/homepage.component';
import { CalendarComponent } from './components/home/calendar/calendar.component';
import { ProfileComponent } from './components/home/profile/profile.component';
import { NoDataDisplayComponent } from './helper/no-data-display/no-data-display.component';
import { SpinnerComponent } from './helper/spinner/spinner.component';
import { ProgressBarComponent } from './helper/progress-bar/progress-bar.component';
import { FamilyTreeComponent } from './components/home/family-tree/family-tree.component';
import { AuthInterceptor } from './interceptor/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    HomepageComponent,
    CalendarComponent,
    ProfileComponent,
    NoDataDisplayComponent,
    SpinnerComponent,
    ProgressBarComponent,
    FamilyTreeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CarouselModule,
    MaterialModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
