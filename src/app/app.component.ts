import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/layout/navbar/navbar.component';
import { FooterComponent } from './shared/components/layout/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  

  links = [
    { path: '/home',    label: 'Home'   , role:null,     icon:"<i class='fa fa-home fa-fw' aria-hidden='true'></i>"},
    { path: '/about',   label: 'About'  , role:null ,    icon:"<i class='fa fa-circle-info'></i>"},
    { path: '/profile', label: 'Profile', role:'USER'  , icon:"<i class='fa fa-address-card'></i>"},
    { path: '/admin',   label: 'Admin'  , role:'ADMIN' , icon:"<i class='fa fa-gear'></i>"}
  ]
  title = 'Myapp';
  exact = false;

}
