import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/components/layout/navbar/navbar.component';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet,  CommonModule],  
  template:`
  <div class="container">
    <div class="col">
      <h3>{{titularAdmin}}</h3>
      <main>
        <router-outlet/>
      </main>
    </div>
  </div>  
  ` 
})
export class AuthLayoutComponent {  
  titularAdmin = 'Auth Layout';
  constructor( ){ 

  } 

  ngOnInit(): void {  
  
  }
    
    
}