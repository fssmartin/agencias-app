import { Component, Renderer2, computed, effect, signal } from '@angular/core'; 
import { Router, RouterLink } from '@angular/router'; 
import { AuthCardComponent } from '../../components/auth-card/auth-card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forget',
  imports: [AuthCardComponent, RouterLink, FormsModule],
  standalone: true,
  template: `


    <app-auth-card>

      <div header>
        <h4>Forgot Password</h4>
        <p>Enter your email to reset your password</p>
      </div>

      <div>
        <form (ngSubmit)="submit()">

          <input
            type="email"
            placeholder="Email"
            [(ngModel)]="email"
            name="email"
            required
          >

          <button type="submit">Send reset link</button>

        </form>
      </div>

      <div footer>
        <p>
          Remembered your password?
          <a routerLink="/auth/login">Back to login</a>
        </p>
      </div>

    </app-auth-card>

  `
})
export class ForgetComponent { 
  

  email = '';

  submit() {
    console.log('Reset password for:', this.email);
  }

}

