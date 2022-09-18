import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { HomepageComponent } from './components/home/homepage/homepage.component';
import { ProfileComponent } from './components/home/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/signin',
    pathMatch: 'full'
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'homepage',
        component: HomepageComponent,
        data: { animation: 'HomePage' }
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: { animation: 'ProfilePage' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
