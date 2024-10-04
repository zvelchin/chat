import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import {
  LocalStorageKeyItem,
  LocalStorageService,
} from '../../core/services/local-storage.service';

export const isAuth: CanActivateFn = (): Observable<boolean> => {
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);

  if (localStorageService.getItem(LocalStorageKeyItem.auth)) {
    return of(true);
  }

  router.navigate(['login']);
  return of(false);
};
