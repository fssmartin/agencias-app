import { inject } from '@angular/core';
import { CanActivateFn, CanDeactivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/auth.service';
import { UserStore } from '../../features/admin/users/user.store';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log("----- adminGuard: CanActivateFn")
 
  // console.log("IS ADMIN ? CanActivateFn adminGuard -- " , authService.isAdmin())
 
  return authService.isAdmin()
      ? true
      : router.createUrlTree(['/home']); 

};

export const loggedGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
console.log("----- loggedGuard: CanActivateFn")
  if (authService.isLogged()) {
    return true;
  }

  // ❌ no esta logado → redirigir
  router.navigate(['/home']);
  return false;
};

 
