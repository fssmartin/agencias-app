import { Routes } from '@angular/router';
import { NotFoundComponent } from './features/public/not-found/not-found.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path:'', redirectTo: 'home', pathMatch: 'full',
    }, 
    {
         path:'home',
         loadChildren:() => import('./agencias/agencias.routes').then(m => m.AGENCIAS_ROUTES)
    },
    {
        path:'auth',
        loadChildren:() => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES),
    }, 
    {
        path:'admin',
        canActivate: [authGuard], // ✅ evita cargar si no está logueado
        loadChildren:() => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES)
    }, 
    {
        path:'about',
        loadComponent: () =>
        import('./features/public/about/about.component')
            .then(m => m.AboutComponent)
    },
    {    
        path: '**',
        component: NotFoundComponent
    }

];

