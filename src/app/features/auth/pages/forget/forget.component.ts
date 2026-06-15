import { Component, Renderer2, computed, effect, inject, signal } from '@angular/core'; 
import { Router, RouterLink } from '@angular/router'; 
import { AuthCardComponent } from '../../components/auth-card/auth-card.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { getErrorMessage } from '../../../../shared/utils/forms/form-errors';
import { CommonModule } from '@angular/common';
import { createForgetForm } from './forget.form';

@Component({
  selector: 'app-forget',
  imports: [AuthCardComponent, RouterLink, FormsModule, ReactiveFormsModule,CommonModule],
  standalone: true,
  template: `

    <app-auth-card>

      <div header >
        <ng-container *ngIf="submitOk===false;">
          <h4>Forgot your password?</h4>
          <p>Enter your email below to reset your password</p>
        </ng-container>
      </div>

      <div body>

<!-- "Reset your password
Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.

Return to sign in" -->

          <form  
            *ngIf="submitOk===false;else successTpl" 
            [formGroup]="form" (ngSubmit)="submit()" class="auth" autocomplete="off">
 
              <label for="email">
                  <span>Email</span> 
                  <input
                    type="email"
                    formControlName="email"
                    placeholder="m@example.com"
                    name="email"
                    id="email"
                    autocomplete="off"
                  /> 
                  <i class="fa fa-envelope icon"></i>
                  <p *ngIf="getError('email')"  class="inputError">
                    {{ getError('email') }}
                  </p>

              </label>
              <div class="fm_actions">  
                  <span class="msgError"> {{error()}}</span>
                  <div class="botones">
                    <button type="submit" 
                        [disabled]="form.invalid || form.pristine">Send recovery email
                    </button>
                  </div>
              </div>
               
          </form>


          <ng-template #successTpl>
            ✅ If an account exists with that email, you will receive a password reset link shortly.
          </ng-template>


      </div>
    

      <div footer  >
        <p>
          Remembered your password?
          <a routerLink="/auth/login">Back to login</a>
        </p>
        <p>
          Don't have an account?
          <a routerLink="/auth/register">Sign up</a>
        </p>                 
      </div>

    </app-auth-card>

  `
})
export class ForgetComponent { 

  private fb = inject(FormBuilder);
  form:FormGroup = createForgetForm(this.fb);
  error = signal('');
  
  submitOk:boolean=false;

  submit() {
      console.log('Login:', this.form.value);
      this.submitOk = true
  }

  getError(controlName: string): string[] {
//    return getErrorMessage(this.form.get(controlName));
    const control = this.form.get(controlName);
    if (!control || !control.errors || !(control.touched || control.dirty)) {
      return [];
    }
    return getErrorMessage(control);
  }


}

