import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/auth.guard';
import { HomeComponent } from './features/public/home/home.component';
import { NotFoundComponent } from './features/public/not-found/not-found.component';

export const routes: Routes = [
    {
        path:'', redirectTo: 'home', pathMatch: 'full',
    }, 

    {
         path:'home',component: HomeComponent
    },

    {
        path:'auth',
        loadChildren:() => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES),
        
    }, 

    {
        path:'admin',
        canActivate: [adminGuard], // ✅ evita cargar si no está logueado
        loadChildren:() => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES)
    }, 

    {
        path:'about',
        loadComponent: () => import('./features/public/about/about.component').then(m => m.AboutComponent)
    },

    {    
        path: '**',
        component: NotFoundComponent
    }

];

