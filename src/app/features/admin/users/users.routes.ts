import { Routes } from '@angular/router'; 

export const USERS_ROUTES : Routes = [
  { path: '', 
    loadComponent: () => 
        import('./pages/user-list/user-list.component')
        .then(m => m.UserListComponent) },
  { path: 'create', 
    loadComponent: () => 
        import('./pages/user-create/user-create.component')
        .then(m => m.UserCreateComponent) },
  { path: 'edit/:id', loadComponent: () => 
        import('./pages/user-edit/user-edit.component')
        .then(m => m.UserEditComponent) }
]
