import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  const isLogged = !!localStorage.getItem('token');

//  peor
//   if (!isLogged) {
//     router.navigate(['/login']);
//     return false;
//   }
//   return true;


// mejor
    //return isLogged ? true : router.createUrlTree(['/auth/login']);
    return true
};