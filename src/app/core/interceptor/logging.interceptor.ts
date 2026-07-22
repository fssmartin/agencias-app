import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';
 
export const logginInterceptor: HttpInterceptorFn = (req, next) => {

    console.log('➡️ REQUEST:', req.method, req.url);
    const start = Date.now();

    return next(req).pipe(
        tap({
            next: () => {
                console.log(
                `✅ RESPONSE ${req.url} (${Date.now() - start} ms)`
                );
            },
            error: () => {
                console.log(
                `❌ ERROR ${req.url} (${Date.now() - start} ms)`
                );
            }
        }) 
    );


};
