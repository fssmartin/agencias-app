import { Routes } from '@angular/router'; 
import { AdminLayoutComponent } from './admin-layout';
import { authGuard } from '../../core/guards/auth.guard';
// import { ConfigurationComponent } from './pages/configuration/configuration.component';
// import { UsersComponent } from './pages/users/users.component';
// import { QuestionsComponent } from './pages/questions/questions.component';

export const ADMIN_ROUTES : Routes = [
 
    // { 
    //     path:'', component:AdminLayoutComponent,
    //     children:[
    //         { path: '',     redirectTo: 'config',   pathMatch: 'full' },
    //         { path: 'config',        component: ConfigurationComponent },
    //         { path: 'users',         component: UsersComponent },
    //         { path: 'questions',     component: QuestionsComponent },
    //     ]
    // } 

    {
        path: '',
        component: AdminLayoutComponent,
        canActivateChild: [authGuard], // ✅ protege navegación interna
        children: [
            {
                path: '',
                redirectTo: 'config',
                pathMatch: 'full'
            },
            {
                path: 'questions',
                loadComponent: () =>
                import('./pages/questions/questions.component')
                    .then(m => m.QuestionsComponent)
            },
            {
                path: 'users',
                loadComponent: () =>
                import('./pages/users/users.component')
                    .then(m => m.UsersComponent)
            },
            {
                path: 'config',
                loadComponent: () =>
                import('./pages/configuration/configuration.component')
                    .then(m => m.ConfigurationComponent)
            },
            {
                path: 'categories',
                loadComponent: () =>
                import('./pages/configuration/configuration.component')
                    .then(m => m.ConfigurationComponent)
            }                 
        ]
    }


]
