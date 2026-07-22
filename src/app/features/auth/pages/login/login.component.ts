import { AfterViewInit, Component, DestroyRef, ElementRef, inject, signal, Signal, ViewChild} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthCardComponent } from '../../components/auth-card/auth-card.component';
import { createLoginForm } from './login.form';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { getErrorMessage } from '../../../../shared/utils/forms/form-errors';
import { AuthService } from '../../auth.service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { catchError, delay, map, of, startWith } from 'rxjs';
import { AuthState } from '../../models/auth.model';
import { AuthStore } from '../../auth.store';

@Component({
  selector: 'app-login',
   imports: [AuthCardComponent, RouterLink, ReactiveFormsModule,CommonModule],
  standalone: true,
  template: `

    <app-auth-card>

        <!-- HEADER -->
        <ng-container header>
            <h4>Welcome back</h4>
            <p>Sign in to Myapp</p>
        </ng-container>

        <!-- BODY -->
        <ng-container body>

          <form [formGroup]="form" (ngSubmit)="login()" class="auth" autocomplete="off">

              <label for="email">
                  <span>Email</span>
                  <input
                      type="text"
                      formControlName="email"
                      placeholder="m@example.com"
                      autofocus
                      name="email"
                      id="email"
                      autocomplete="off"  
                      />
                      <i class="fa fa-envelope icon"></i>
                      <!-- [ngClass]="{ 'error': form.get('email')?.invalid && form.get('email')?.touched }" -->

                  <p *ngIf="getError('email')" class="inputError">
                    {{ getError('email') }}
                  </p>
              </label>

              <label for="password">
                  <span>Password</span>
                  <a routerLink="/auth/forget" class="linkLabel">Forgot your password?</a>
                  <input
                    type="password"
                    formControlName="password"
                    placeholder="Create a secure password"
                    name="password"
                    id="password"
                    autocomplete="new-password" 
                    />
                    <i class="fa fa-lock icon"></i>
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
                  "password":"1234a.A"

              </label>

              <div class="fm_actions">
                  <span class="msgError"> {{state().error}}</span>
                  <div class="botones">
                    <button type="submit"
                        [disabled]="form.invalid || form.pristine || state().loading">
                            @if (state().loading) {
                              <i class="fa fa-spinner fa-spin"></i> Checking...
                            } @else {
                              Login
                            }
                    </button>
                  </div>
              </div>
 
          </form>
        </ng-container>

        <!-- FOOTER -->
        <ng-container footer>
            <p>
              Don't have an account?
              <a routerLink="/auth/register">Create an account</a>
            </p>
        </ng-container>

    </app-auth-card>

    <!-- <pre>{{ loginState() | json }}</pre> -->

  `
})
export class LoginComponent implements AfterViewInit {

  private fb = inject(FormBuilder);
  form:FormGroup = createLoginForm(this.fb);

 
  public authStore = inject(AuthStore);

  state = this.authStore.state;
  
  private destroyRef = inject(DestroyRef);

  constructor(){ }

  ngOnInit(): void {

      this.form.reset({
        email: 'belen.perez@example.com',
        password: '1234a.A'
      });

  }
 
  login() {

      console.log('Login:', this.form.value);

      if (this.form.invalid) {
          this.form.markAllAsTouched();
          return;
      }

      const { email, password } =  this.form.value;

      this.authStore.login(email, password);
       
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

  getError(controlName: string): string[] {
//    return getErrorMessage(this.form.get(controlName));
    const control = this.form.get(controlName);
    if (!control || !control.errors || !(control.touched || control.dirty)) {
      return [];
    }
    return getErrorMessage(control);

  }

}


