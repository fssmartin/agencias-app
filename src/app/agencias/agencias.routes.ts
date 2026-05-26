import { Routes } from '@angular/router'; 

import { ListAgenciaComponent } from './list-agencia/list-agencia.component'; 
import { DetailAgenciaComponent } from './detail-agencia/detail-agencia.component'; 
import { AgenciaLayoutComponent } from './agencia-layout/agencia-layout.component';

export const AGENCIAS_ROUTES : Routes = [

    { path:'', component:AgenciaLayoutComponent , pathMatch: 'full' },

]
