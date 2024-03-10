import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./tray-view/tray-view.component').then((c) => c.TrayViewComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent)
  },
  {
    path: 'user',
    loadComponent: () => import('./tray-view/tray-view.component').then((c) => c.TrayViewComponent),
  },
];