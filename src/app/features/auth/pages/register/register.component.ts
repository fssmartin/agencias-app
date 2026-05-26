import { Component} from '@angular/core';  
import { Router, RouterLink } from '@angular/router'; 
import { AuthCardComponent } from '../../components/auth-card/auth-card.component';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-register', 
 imports: [AuthCardComponent, RouterLink, FormsModule],
  standalone: true,
  template: `

  <app-auth-card>

        <!-- HEADER -->
        <div header>
          <h4>Register</h4>
          <p>Create your account</p>
        </div>

        <!-- BODY -->
        <div>
          <form (ngSubmit)="register()">

            <input
              type="text"
              placeholder="Name"
              [(ngModel)]="name"
              name="name"
              required
            />

            <input
              type="email"
              placeholder="Email"
              [(ngModel)]="email"
              name="email"
              required
            />

            <input
              type="password"
              placeholder="Password"
              [(ngModel)]="password"
              name="password"
              required
            />

            <button type="submit">Register</button>

          </form>
        </div>

        <!-- FOOTER -->

        <div footer>
          <p>
            Forgot your password?
            <a routerLink="/auth/forget">Reset it</a> ✅
          </p>
        </div>


    </app-auth-card>

  ` 
})

export class RegisterComponent {

  name = '';
  email = '';
  password = '';

  register() {
    console.log('Register:', this.name, this.email, this.password);

    // aquí luego conectarías con AuthService
  }
}




