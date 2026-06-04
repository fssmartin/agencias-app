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
          <h4>Forgot Password</h4>
          <p>Enter your email to reset your password</p>
        </ng-container>
      </div>

      <div body>

          <form  
            *ngIf="submitOk===false;else successTpl" 
            [formGroup]="form" (ngSubmit)="submit()" class="login" autocomplete="off">
 
              <label for="email">
                  <span></span> 
                  <input
                    type="email"
                    formControlName="email"
                    placeholder="Email"
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
                        [disabled]="form.invalid || form.pristine">Send
                    </button>
                  </div>
              </div>
               
          </form>


          <ng-template #successTpl>
            ✅ If an account exists with that email, you will receive a password reset link shortly.
          </ng-template>


      </div>
    

      <div footer  style="display:flex;justify-content:space-between;margin:10px 0">
        <p>
          Remembered your password?
          <a routerLink="/auth/login">Back to login</a>
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

  getError(controlName: string): string {
    return getErrorMessage(this.form.get(controlName));
  }


}

