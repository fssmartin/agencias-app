import { Routes } from '@angular/router'; 

export const IMAGES_ROUTES : Routes = [
  { path: '', 
    // loadComponent: () => 
    //     import('./pages/images-list/images-list.component')
    //     .then(m => m.ImageListComponent) 
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/images-list/images-list.component')
            .then(m => m.ImageListComponent)
      }
    ]
  },

]