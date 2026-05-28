import { Component, inject} from '@angular/core';  
import { RouterLink } from '@angular/router';
import { AuthCardComponent } from '../../components/auth-card/auth-card.component';
import { createLoginForm } from './login.form';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
   imports: [AuthCardComponent, RouterLink, ReactiveFormsModule,CommonModule],
  standalone: true,
  template: `

    <app-auth-card>

        <!-- HEADER -->
        <div header>
            <h4>Login</h4>
            <p>Please enter your credentials</p>
        </div>

        <!-- BODY -->
        <div>
          <form [formGroup]="form" (ngSubmit)="login()">

              <input
                  formControlName="email"
                  placeholder="Email"
                  [ngClass]="{ 'error': form.get('email')?.invalid && form.get('email')?.touched }"
              />

              <input
                  type="password"
                  formControlName="password"
                  placeholder="Password"
                  [ngClass]="{ 'error': form.get('password')?.invalid && form.get('password')?.touched }"
              /> 

              <div *ngIf="form.get('email')?.invalid && form.get('email')?.touched">
                Email inválido
              </div>
              <div *ngIf="form.get('password')?.touched && form.get('password')?.errors?.['minlength']">
                Password length must be at least <strong>{{form.get('password')?.errors?.['minlength']?.requiredLength }}</strong> characters
              </div>


              <button type="submit" [
                  disabled]="form.invalid || form.pristine" style="margin-top:10px"
              >Login</button>

              <p>is invalid form ?  :{{ form.invalid }}</p>
          </form>
        </div>

        <!-- FOOTER -->
        <div footer>
            <p>
              Don't have an account?
              <a routerLink="/auth/register">Register</a>
            </p> 
            <p>
              Forgot your password?
              <a routerLink="/auth/forget">Reset it</a> ✅
            </p>
        </div>

    </app-auth-card>


  `
})
export class LoginComponent {  



  private fb = inject(FormBuilder);

  form = createLoginForm(this.fb);


  login() {

    if (this.form.invalid) return;
    console.log('Login:', this.form.value);
  
  }
  
  ngOnInit(): void {  
    this.onPathValue();
    this.onSetValue();
  }

  // solo una propiedad del formulario 
  // cargar por ejemplo de una api data a un campo del formulario
  onPathValue(){
    this.form.patchValue({
      email: 'test@example.com'
    });
  }

  //todas 
  onSetValue(){
    this.form.setValue({
      email: 'test@example.com',
      password: 'password123'
    });
  }
}


