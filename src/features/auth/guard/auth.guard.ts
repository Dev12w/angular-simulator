import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);

  return authService.isAuthenticated() ? true : router.createUrlTree(['/login']);
};
