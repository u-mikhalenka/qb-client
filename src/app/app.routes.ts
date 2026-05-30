import { Routes } from '@angular/router';
import { protectedRouteGuard } from './core/auth.service';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login-page/login-page').then((m) => m.LoginPage),
    canActivate: [protectedRouteGuard()],
  },
  {
    path: 'torrents',
    loadComponent: () =>
      import('./pages/torrents-list-page/torrents-list-page').then((m) => m.TorrentsListPage),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/torrents',
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
