import { inject } from '@angular/core';
import { CanActivateFn, CanDeactivateFn, Router } from '@angular/router';
import { UserStore } from '../../features/admin/pages/users/user.store';
import { AuthStore } from '../../features/auth/auth.store';

export const adminGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  console.log("----- adminGuard: CanActivateFn")
 
  // console.log("IS ADMIN ? CanActivateFn adminGuard -- " , authService.isAdmin())

  
  // tengo que preguntar por la signal en authStore.. no en service

  return authStore.isAdmin()
      ? true
      : router.createUrlTree(['/home']); 
};

export const loggedGuard: CanActivateFn = () => {
    const authStore = inject(AuthStore);
    const router = inject(Router);
    
    console.log("----- loggedGuard: CanActivateFn")
    if (authStore.isLogged()) {
      return true;
    }

    // ❌ no esta logado → redirigir
    router.navigate(['/home']);
    return false;
};


// YA NO SE USA
// export const canDeactivateGuard: CanDeactivateFn<any> =
//   (component, currentRoute, currentState, nextState) => {

//     //tengo que limpiar todos los stores de admin, user, ....  cuando se salgan !

//     console.log("_____ canDeactivateGuard -- cleanMsgState")

//      const userStore = inject(UserStore);
//      userStore.cleanMsgState(false);
//      return true;
//   };

 
