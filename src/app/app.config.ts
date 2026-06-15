import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptor/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor])
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