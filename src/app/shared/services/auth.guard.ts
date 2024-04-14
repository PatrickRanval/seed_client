import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authService = inject(AuthService)

  if (authService.isAuthenticated()) {
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};
