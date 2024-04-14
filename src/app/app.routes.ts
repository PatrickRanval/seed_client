import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { TrayViewComponent } from './tray-view/tray-view.component';
import { SeedShelfComponent } from './seed-shelf/seed-shelf.component';
import { AuthGuard } from './shared/services/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: LandingComponent
  },
  {
    path: 'user/:id',
    canActivate: [ AuthGuard ],
    children: [
      {
        path: 'trays',
        component: TrayViewComponent
      },
      {
        path: 'shelf',
        component: SeedShelfComponent
      }
    ]
  },
  // Redirect any other route to the login page
  {
    path: '**',
    redirectTo: 'login'
  }
];