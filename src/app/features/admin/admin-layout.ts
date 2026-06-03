import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/components/layout/navbar/navbar.component';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet,  CommonModule, NavbarComponent],  
  template:`
  <div class="container">
    <div class="col">
        <h3>{{titularAdmin}}</h3>      
        <app-navbar [isHeader]="false" [links]="links" [exact]="true"></app-navbar>
        <main class="main">
          <router-outlet/>
        </main>
    </div>
  </div> 
  ` 
})
export class AdminLayoutComponent {  
  titularAdmin = 'Admin Layout';
  links = [
    { path: './config', label: 'Configurations' },
    { path: './questions', label: 'Questions' },
    { path: './users', label: 'Users' },
    { path: './categories', label: 'Categories' }
  ]

 
  constructor( ){ 

  } 

  ngOnInit(): void {  
  
  }
    
    
}