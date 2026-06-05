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
    { path: '/home',    label: 'Home'   , role:null},
    { path: '/about',   label: 'About'  , role:null },
    { path: '/profile', label: 'Profile', role:'USER'  },
    { path: '/admin',   label: 'Admin'  , role:'ADMIN' }
  ]
  title = 'Myapp';
  exact = false;

}
