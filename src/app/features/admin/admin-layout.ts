import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/components/layout/navbar/navbar.component';
import { AdminNavigationService } from './admin.service';

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
    { path: './questions',  label: 'Questions' , role:'ADMIN' , icon:"<i class='fa-solid fa-circle-question'></i>" },
    { path: './users',      label: 'Users',      role:'ADMIN' , icon:"<i class='fa-solid fa-users'></i>"},
    { path: './categories', label: 'Categories', role:'ADMIN' , icon:"<i class='fa-solid fa-layer-group'></i>" }
  ]

 

  constructor(
    private adminNavigationService: AdminNavigationService
  ) {}


  ngOnInit(): void {  
  
  }
    
    
}