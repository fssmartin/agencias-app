import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptor/auth.interceptor';
import { loadingInterceptor } from './core/interceptor/loading.interceptor';
import { errorInterceptor } from './core/interceptor/error.interceptor';
import { logginInterceptor } from './core/interceptor/logging.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        authInterceptor,
        loadingInterceptor,
        errorInterceptor        
        //logginInterceptor,
      ])
    )
  ]
};

// ¿Cuándo NO usar fetch?
// 👉 Caso típico:

// subir imágenes
// subir vídeos
// barra de progreso
// 👉 📌 Si necesitas progreso → NO uses withFetch()
// 👉 📌 Si solo haces APIs → puedes usarlo