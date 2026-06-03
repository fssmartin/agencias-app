import { Component, inject} from '@angular/core';  
import { AuthCardComponent } from '../../components/auth-card/auth-card.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { createRegisterForm } from './register.form';
import { getErrorMessage } from '../../../../shared/utils/forms/form-errors';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-register', 
   imports: [AuthCardComponent, ReactiveFormsModule,CommonModule],
  standalone: true,
  template: `

  <app-auth-card>

        <!-- HEADER -->
        <div header>
          <h4>Register</h4>
          <p>Create your account</p>
        </div>

        <!-- BODY -->
        <div body>

          <form [formGroup]="form" (ngSubmit)="register()" class="login" autocomplete="off">

            <label for="name">
              <span></span>
              <input
                type="text"
                placeholder="Name"
                name="name"
                id="name"
                required 
                role="presentation" required autocomplete="off" autofocus="" /> 
                <p *ngIf="getError('name')" class="inputError">
                  {{ getError('name') }}
                </p>                
            </label>
           
            <label for="email">
              <span></span>
              <input
                type="email"
                placeholder="Email"
                name="email"
                id="email"
                required 
                role="presentation" required autocomplete="of" autofocus="" /> 
                <p *ngIf="getError('email')" class="inputError">
                  {{ getError('email') }}
                </p>                
            </label>
         
            <label for="password">
              <span></span>
              <input
                type="password"
                placeholder="Password"
                name="password"
                id="password"
                required 
                role="presentation" required autocomplete="new-password" autofocus="" /> 
                <p *ngIf="getError('password')" class="inputError">
                  {{ getError('password') }}
                </p>                
            </label>
          
             <div class="fm_actions">  
                  <button type="submit" 
                      [disabled]="form.invalid || form.pristine">Register
                  </button>
              </div>

          </form>
        </div>

        <!-- FOOTER -->

        <div footer>
          <!-- <p>
            Forgot your password?
            <a routerLink="/auth/forget">Reset it</a> ✅
          </p> -->
        </div>
    </app-auth-card>
  ` 
})

export class RegisterComponent {

  private fb = inject(FormBuilder);
  form:FormGroup = createRegisterForm(this.fb);

  ngOnInit(): void { 
    this.form.reset({
      email: '',
      name: '',
      password: ''
    });

  }

  ngAfterViewInit(): void {  
   

  }

  register() {
    console.log('Register:', this.form.value);
    if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
    }
  }
  
  getError(controlName: string): string {
    return getErrorMessage(this.form.get(controlName));
  }


}




