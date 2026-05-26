import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet,  CommonModule],  
  template:`
    <h3>{{titularAdmin}}</h3>

    <main>
      <router-outlet/>
    </main>
  ` 
})
export class AuthLayoutComponent {  
  titularAdmin = 'Auth Layout';
  constructor( ){ 

  } 

  ngOnInit(): void {  
  
  }
    
    
}