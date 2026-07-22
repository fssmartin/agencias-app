import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
// import { finalize } from 'rxjs/operators'; 

// export const errorInterceptor: HttpInterceptorFn = (req, next) => {

//   console.log('➡️ ERROR:');

//   return next(req).pipe(
//     finalize(() => {
//         console.log('✅ ERROR:');
//     })
//   );


// };


export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);
  
  //const authService = inject(AuthService);
  //const notification = inject(NotificationService);

  return next(req).pipe(

    catchError((error: HttpErrorResponse) => {

      switch (error.status) {

        case 0:
          //notification.error('No se ha podido conectar con el servidor.');
          console.log('❌ No se ha podido conectar con el servidor.');
          break;

        case 401:
          //authService.logout();
          console.log('❌ La sesión ha expirado.');
          router.navigate(['/login']);
          //notification.warning('La sesión ha expirado.');
          break;

        case 403:
          //notification.warning('No tienes permisos.');
          console.log('❌ No tienes permisos.');
          break;

        case 500:
          console.log('❌ Ha ocurrido un error interno.');
          //notification.error('Ha ocurrido un error interno.');
          break;

        default:
          console.error('❌ ',error);
      }

      return throwError(() => error);
    })

  );
};
