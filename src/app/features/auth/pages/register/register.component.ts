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
          <h4>Sign up for MyApp</h4>
          <p>Get started with your free account today</p>
        </div>

        <!-- BODY -->
        <div body>

          <form [formGroup]="form" 
                (ngSubmit)="register()" 
                class="auth" autocomplete="off">

            <label for="name">
              <span class="required">Username</span>
              <input
                type="text"
                placeholder="Jhon Doe"
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
              <span class="required">Email</span>
              <input
                type="email"
                placeholder="m@example.com"
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
              <span class="required">Password</span>
              <input
                type="password"
                placeholder="Create a secure password"
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
          
            <label for="cpassword">
              <span class="required">Confirm Password</span>
              <input
                type="password"
                placeholder="Confirm your password"
                name="cpassword"
                id="cpassword"
                required  
                role="presentation" required autocomplete="new-password" autofocus="" /> 
                <i class="fa fa-lock icon"></i>
                <!-- <p *ngIf="getError('password')" class="inputError">
                  {{ getError('password') }}
                </p>                 -->
            </label>

            <label for="country">
              <span>Your Country/Region</span>
              <select name="country" id="country" required  
                role="presentation" required   autofocus=""> 
                  <option value="ES">España</option>
                  <option value="SZ">Eswatini</option>
                  <option value="ET">Ethiopia</option>
                  <option value="FK">Falkland Islands</option>
                  <option value="FO">Faroe Islands</option>
                  <option value="FJ">Fiji</option>
                  <option value="FI">Finland</option>
                  <option value="FR">France</option> 
                  <option value="TF">French Southern Lands</option>
                  <option value="GA">Gabon</option>
                  <option value="GM">Gambia</option>
                  <option value="GE">Georgia</option>
                  <option value="DE">Germany</option>
                  <option value="GH">Ghana</option>               
                </select>                
                <p class="inputInfo">
                  For compliance reasons, we're required to collect country information to send you occasional updates and announcements.
                </p>                
            </label>            
                      
             <div class="fm_actions">  
                  <span class="msg msgError">{{msg()}}</span>
                  <div class="botones">
                   <button type="submit"
                        [disabled]="form.invalid || form.pristine || registerState().loading">
                            @if (registerState().loading) {
                              <i class="fa fa-spinner fa-spin"></i> Checking...
                            } @else {
                              Create Account
                            }
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

  registerState = signal({ data: {}, loading: false, error: null })

  constructor(
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

      this.registerState.set({ data:{}, loading:true,error:null  })

      if (this.form.invalid) {
          this.form.markAllAsTouched();
          return;
      }

      const { name, email, password } =  this.form.value;
    
      this._authService.register(name.trim(),email.trim(), password.trim())
      .subscribe((request) =>{
          console.log("Usuario registrodo,", request);
          this.registerState.set({ 'data':request, loading:false,error:null  })
      }) 
  
    //  this.router.navigate(['/home']);
  
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




