
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, mergeMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
    const router = inject(Router);

  // 🔐 Obtener token
  const token = localStorage.getItem('token');

  // Porque NO queremos añadir el token al login ni registro
  const isAuthRequest =
              req.url.includes('/login') ||
              req.url.includes('/register');

  console.log('-- Interceptor ', isAuthRequest,token );

  // ✅ Si NO hay token → seguimos igual
  if (!token || isAuthRequest) {
    return next(req);
  }

  // ✅ Clonar request y añadir header
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  // ✅ Continuar con la petición modificada
 
    return next(authReq).pipe(
        // mergeMap(response => {
        //   return throwError(() =>
        //     new HttpErrorResponse({
        //       status: 401
        //     })
        //   );
        // }),
        catchError((error) => {

            if (error.status === 401) {
                console.log('🔴 Token inválido o expirado');
                localStorage.removeItem('token');
                router.navigate(['auth/login']);
            }

            return throwError(() => error);
        })

    );

};

// Componente → http.get('/users')
//    ↓
// Interceptor → añade token automáticamente
//    ↓
// Servidor (json-server-auth) valida