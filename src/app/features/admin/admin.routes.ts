import { Routes } from '@angular/router'; 
import { AdminLayoutComponent } from './admin-layout';
import { adminGuard, canDeactivateGuard } from '../../core/guards/auth.guard';
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
        children: [
            {
                path: '',
                redirectTo: 'users',
                pathMatch: 'full',
            },
            {
                path: 'users',
//                canDeactivate: [canDeactivateGuard],
                loadChildren: () => import('./pages/users/users.routes').then(m => m.USERS_ROUTES)    
            },
            {
                path: 'questions',
//                canDeactivate: [canDeactivateGuard],
                loadChildren: () => import('./pages/questions/questions.routes').then(m => m.QUESTIONS_ROUTES)
            },
/*
            {
                path: 'config',
                loadChildren: () => import('./configuration/configuration.routes').then(m => m.CONFIGURATION_ROUTES)
            },
            {
                path: 'categories',
                loadChildren: () => import('./questions/questions.routes').then(m => m.QUESTIONS_ROUTES)
            }
*/
        ]
    }


]
