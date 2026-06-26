import { inject } from '@angular/core';
import { CanActivateFn, CanDeactivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/auth.service';
import { UserStore } from '../../features/admin/pages/users/user.store';

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



export const canDeactivateGuard: CanDeactivateFn<any> =
  (component, currentRoute, currentState, nextState) => {

    //tengo que limpiar todos los stores de admin, user, ....  cuando se salgan !
     const userStore = inject(UserStore);
     userStore.cleanMsgState(false);
    return true;
  };

 
