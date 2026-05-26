import { Routes } from '@angular/router'; 
import { AuthLayoutComponent } from './auth-layout';
// import { RegisterComponent } from './pages/register/register.component';
// import { LoginComponent } from './pages/login/login.component';


export const AUTH_ROUTES : Routes = [

    // { path:'', component:LoginComponent , pathMatch: 'full' },
    // { path:'register', component:RegisterComponent },
    // { path:'login', component:LoginComponent },
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            },
            {
                path: 'login',
                loadComponent: () =>
                import('./pages/login/login.component')
                    .then(m => m.LoginComponent)
            },    
            {
                path: 'register',
                loadComponent: () =>
                import('./pages/register/register.component')
                    .then(m => m.RegisterComponent)
            }    
        ]
    }
]
