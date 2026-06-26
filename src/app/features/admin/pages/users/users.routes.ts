import { Routes } from '@angular/router'; 
import { rolesResolver } from './resolvers/roles.resolver';


export const USERS_ROUTES: Routes = [
  {
    path: '',
    resolve: {
      roles: rolesResolver
    },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/user-list/user-list.component')
            .then(m => m.UserListComponent)
      }, 
      {
        path: 'create',
        data: { mode: 'create' },
        loadComponent: () =>
          import('./pages/user-edit/user-edit.component')
            .then(m => m.UserEditComponent)
      },
      {
        path: ':id',
        data: { mode: 'view' },
        loadComponent: () =>
          import('./pages/user-edit/user-edit.component')
            .then(m => m.UserEditComponent)
      },
      {
        path: ':id/edit',
        data: { mode: 'edit' },
        loadComponent: () =>
          import('./pages/user-edit/user-edit.component')
            .then(m => m.UserEditComponent)
      },

      // {
      //   path: 'edit/:id',
      //   data: { mode: 'create' },        
      //   loadComponent: () =>
      //     import('./pages/user-edit/user-edit.component')
      //       .then(m => m.UserEditComponent)
      // },
      // {
      //   path: 'edit',
      //   loadComponent: () =>
      //     import('./pages/user-edit/user-edit.component')
      //       .then(m => m.UserEditComponent)
      // }
    ]
  }
];

