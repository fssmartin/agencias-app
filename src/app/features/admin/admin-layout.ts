import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet,  CommonModule, NavbarComponent],  
  template:`
    <h3>{{titularAdmin}}</h3>

    <app-navbar [links]="links" [exact]="exact"></app-navbar>

    <main>
      <router-outlet/>
    </main>
  ` 
})
export class AdminLayoutComponent {  
  titularAdmin = 'Admin Layout';
  links = [
    { path: './config', label: 'Configurations' },
    { path: './questions', label: 'Questions' },
    { path: './users', label: 'Users' },
    { path: './agencias', label: 'Agencias' }
  ]
exact = true;
  constructor( ){ 

  } 

  ngOnInit(): void {  
  
  }
    
    
}