import { DestroyRef, inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

import { UserStore } from './pages/users/user.store'; 
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
// import { QuestionStore } 

@Injectable({
  providedIn: 'root'
})
export class AdminNavigationService {

  private destroyRef = inject(DestroyRef); // ✅ CLAVE

  constructor(
    private router: Router,
    private userStore: UserStore,
    // private questionStore: QuestionStore
  ) {

      // Esto lo he creado POR QUE con este servicio, limpio los STORES correspondientes. 
      // antes lo tenia en el auth.guard.ts --> canDeactivateGuard 
      // y en la routes en admin.routes.ts
      // se quita del fichero de routes --> canDeactivate.

//         {
//             path: 'users',
// //            canDeactivate: [canDeactivateGuard],
//             loadChildren: () => import('./pages/users/users.routes').then(m => m.USERS_ROUTES)    
//         },
//         {
//             path: 'questions',
// //            canDeactivate: [canDeactivateGuard],
//             loadChildren: () => import('./pages/questions/questions.routes').then(m => m.QUESTIONS_ROUTES)
//         },
      
      this.router.events
      .pipe(
          filter(event => event instanceof NavigationEnd),
          takeUntilDestroyed(this.destroyRef)
        )        
        .subscribe(() => {
            
        console.log("---------------- this.router.url --->          ", this.router.url)

// TENGO QUE IR LIMPIANDO TODOS LOS STORES... 


        // Si NO estoy en users => limpio UserStore
        if (!this.router.url.startsWith('/admin/users')) {
          this.userStore.cleanMsgState(false);
        }

        // Si NO estoy en questions => limpio QuestionStore
        // if (!this.router.url.startsWith('/admin/questions')) {
        //   this.questionStore.reset();
        // }

      });
  }
}