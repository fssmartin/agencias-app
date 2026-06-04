import { Component, inject, signal} from '@angular/core';  
import { AuthCardComponent } from '../../components/auth-card/auth-card.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { createRegisterForm } from './register.form';
import { getErrorMessage } from '../../../../shared/utils/forms/form-errors';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';


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

          <form [formGroup]="form" 
                (ngSubmit)="register()" 
                class="login" autocomplete="off">

            <label for="name">
              <span></span>
              <input
                type="text"
                placeholder="Name"
                name="name"
                id="name"
                required 
                 formControlName="name"
                role="presentation" required autocomplete="off" autofocus="" /> 
                <i class="fa fa-user icon"></i>
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
                formControlName="email"
                role="presentation" required autocomplete="of" autofocus="" /> 
                <i class="fa fa-envelope icon"></i>
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
                formControlName="password"
                role="presentation" required autocomplete="new-password" autofocus="" /> 
                <i class="fa fa-lock icon"></i>
                <p *ngIf="getError('password')" class="inputError">
                  {{ getError('password') }}
                </p>                
            </label>
          
             <div class="fm_actions">  
                  <span class="msg"
                  [ngClass]="msgClass()">{{msg()}}</span>
                  <div class="botones">
                    <button type="submit" 
                        [disabled]="form.invalid || form.pristine">Register
                    </button>
                  </div>
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

  msg = signal('');
  msgClass = signal('msjOk');

  constructor(
    private router:Router,
    private _authService:AuthService
  ){ }

  ngOnInit(): void { 
    
    this.form.reset({
      name: '',
      email: '',
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

    const { name, email, password } =  this.form.value;
    if( this._authService.register(name,email, password) ) {
      //this.router.navigate(['/auth']);
      this.msg.set('Usuario registrado correctamente..');
      this.msgClass.set('msgOk');
    } else {
      this.msg.set('Error a la hora de registro');
      this.msgClass.set('msgError');
      
    }
  }
  
  getError(controlName: string): string {
    return getErrorMessage(this.form.get(controlName));
  }


}




