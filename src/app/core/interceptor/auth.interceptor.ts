
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, mergeMap, tap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
    const router = inject(Router);

    // 🔐 Obtener token
    const token = localStorage.getItem('token');
    const start = Date.now();

    // Porque NO queremos añadir el token al login ni registro ni forget
    const isAuthRequest =
              req.url.includes('/login') ||
              req.url.includes('/forget') ||
              req.url.includes('/register');

     console.log('➡️ AUTH:', req.url, isAuthRequest, token ? 'true':'false');

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
 
// si comento lo de abajo y antes da error , 
// este codigo es en el error.interceptor donde se veria...o saltaria.

        // catchError((error) => {

        //     if (error.status === 401) {
        //         console.log('🔴 Token inválido o expirado');
        //         localStorage.removeItem('token');
        //         router.navigate(['auth/login']);
        //     }

        //     return throwError(() => error);
        // })
       tap(_=>console.log(`✅ AUTH ${req.url} (${Date.now() - start} ms)`))
    );

};

// Componente → http.get('/users')
//    ↓
// Interceptor → añade token automáticamente
//    ↓
// Servidor (json-server-auth) valida