import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('./landing/landing.component').then((c) => c.LandingComponent)
  },
  {
    path: 'user/:id/trays',
    loadComponent: () => import('./tray-view/tray-view.component').then((c) => c.TrayViewComponent),
  },
  {
    path: 'user/:id/shelf',
    loadComponent: () => import('./seed-shelf/seed-shelf.component').then((c) => c.SeedShelfComponent),
  },

]; 