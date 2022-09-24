import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { FamilyTreeComponent } from './components/home/family-tree/family-tree.component';
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
        path: 'family-tree',
        component: FamilyTreeComponent,
        data: { animation: 'FamilyTreePage' }
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
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules, useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
