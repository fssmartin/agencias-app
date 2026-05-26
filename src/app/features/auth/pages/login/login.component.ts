import { Component} from '@angular/core';  
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-login',
  imports: [RouterLink],
  standalone: true,
  template: `
    <h4>Login</h4>
    <p>Please enter your credentials to log in.</p> 
   
   
    <h6>Don't have an account?
        <a routerLink="/auth/register" title="Register">Register</a>
    </h6>
  `
})
export class LoginComponent {  
  constructor( ){  }

}



