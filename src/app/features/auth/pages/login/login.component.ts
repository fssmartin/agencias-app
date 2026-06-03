import { AfterViewInit, Component, ElementRef, inject, signal, Signal, ViewChild} from '@angular/core';  
import { Router, RouterLink } from '@angular/router';
import { AuthCardComponent } from '../../components/auth-card/auth-card.component';
import { createLoginForm } from './login.form';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { getErrorMessage } from '../../../../shared/utils/forms/form-errors';
import { AuthService } from '../../auth.service';

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
        <div body>

          <p>error ? {{error()}}</p>

          <form [formGroup]="form" (ngSubmit)="login()" class="login" autocomplete="off">

              <label for="email">
                  <span></span>
                  <input
                      formControlName="email"
                      placeholder="Email"
                      autocomplete="off"  
                      autofocus
                      #emailInput
                      />
                      <!-- [ngClass]="{ 'error': form.get('email')?.invalid && form.get('email')?.touched }" -->
    
                  <p *ngIf="getError('email')" class="inputError">
                    {{ getError('email') }}
                  </p>
              </label>

              <label for="password">
                  <span></span> 
                  <input
                    type="password"
                    formControlName="password"
                    placeholder="Password"
                    name="password"
                    id="password"
                    autocomplete="new-password"
                    /> 
                      <!-- [ngClass]="{ 'error': form.get('password')?.invalid && form.get('password')?.touched }" -->
                    <!-- 
                    <div *ngIf="form.get('email')?.invalid && form.get('email')?.touched">
                      Email inválido
                    </div>
                    <div *ngIf="form.get('password')?.touched && form.get('password')?.errors?.['minlength']">
                      Password length must be at least <strong>{{form.get('password')?.errors?.['minlength']?.requiredLength }}</strong> characters
                    </div> -->  

                  <p *ngIf="getError('password')"  class="inputError">
                    {{ getError('password') }}
                  </p>
              </label>
              <div class="fm_actions">  
                  <button type="submit" 
                      [disabled]="form.invalid || form.pristine">Login
                  </button>
              </div>
               
          </form>
        </div>

        <!-- FOOTER -->
        <div footer  style="display:flex;justify-content:space-between">
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
export class LoginComponent implements AfterViewInit {  

  private fb = inject(FormBuilder);
  form:FormGroup = createLoginForm(this.fb);

  error = signal('');

  constructor(
    private router:Router,
    private _authService:AuthService
  ){

  }

  ngOnInit(): void { 
    
      this.form.reset({
        email: '',
        password: ''
      });

  }

  login() {
 
    console.log('Login:', this.form.value);

    if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
    }

    const { email, password } =  this.form.value;
    if( this._authService.login(email, password) ) {
      this.router.navigate(['/home']);
    } else {
      this.error.set('Credenciales incorrectas');
    }

    
  }
  
  ngAfterViewInit(): void {  
    //this.onPathValue();
     
   // this.onSetValue();

    // this.form.reset({
    //   email: '',
    //   password: ''
    // });

    //this.focusInput(this.emailInput);
    

  }

  focusInput(el: ElementRef) {
    setTimeout(() => el.nativeElement.focus());
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
      email: '',
      password: ''
    });
  }

  getError(controlName: string): string {
    return getErrorMessage(this.form.get(controlName));
  }



}


