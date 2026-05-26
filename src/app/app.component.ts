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
    { path: '/home', label: 'Home' },
    { path: '/admin', label: 'Admin' },
    { path: '/auth', label: 'Login' },
    { path: '/about', label: 'About' }
  ]
  title = 'Myapp';
  exact = false;
}
