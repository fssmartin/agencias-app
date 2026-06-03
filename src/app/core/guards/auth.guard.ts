import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/auth.service';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log("----------------------- VALIDO ?  ", authService.isAdmin())

  if (authService.isAdmin()) {
    return true;
  }

  // ❌ no es admin → redirigir
  router.navigate(['/home']);
  return false;
};
