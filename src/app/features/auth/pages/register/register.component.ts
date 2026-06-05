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
              <span>Username</span>
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
              <span>Email</span>
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
              <span>Password</span>
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
              <span>Confirm Password</span>
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
                  <option value="AF">Afghanistan</option>
                  <option value="AX">Åland</option>
                  <option value="AL">Albania</option>
                  <option value="DZ">Algeria</option>
                  <option value="AS">American Samoa</option>
                  <option value="AD">Andorra</option>
                  <option value="AO">Angola</option>
                  <option value="CZ">Czech Republic</option>
                  <option value="DK">Denmark</option>
                  <option value="DJ">Djibouti</option>
                  <option value="DM">Dominica</option>
                  <option value="DO">Dominican Republic</option>
                  <option value="EC">Ecuador</option>
                  <option value="EG">Egypt</option>
                  <option value="SV">El Salvador</option> 
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
                        [disabled]="form.invalid || form.pristine">Create account
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
      this.router.navigate(['/home']);
    } else {
      this.msg.set('Error a la hora de registro');      
    }
  }
  
  getError(controlName: string): string {
    return getErrorMessage(this.form.get(controlName));
  }


}




