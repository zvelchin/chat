import { Routes } from '@angular/router';
import { isAuth } from './pages/main/main.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'main',
    loadComponent: () =>
      import('./pages/main/main.component').then((m) => m.MainComponent),
    canActivate: [isAuth],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'user',
    loadComponent: () =>
      import('./pages/user-settings/user-settings.component').then(
        (m) => m.UserSettingsComponent
      ),
    canActivate: [isAuth],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
