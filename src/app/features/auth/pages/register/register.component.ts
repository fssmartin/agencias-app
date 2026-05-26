import { Component} from '@angular/core';  
import { Router, RouterLink } from '@angular/router'; 



@Component({
  selector: 'app-register', 
  imports: [RouterLink],
  standalone: true,
//  templateUrl: './register.component.html'
  template: `
    <h4>Register</h4>
    <p>Please fill in the form to create an account.</p>

    <h6>have an account?
        <a routerLink="/auth/login" title="Login">Login</a>
    </h6>

  ` 
})
export class RegisterComponent {  


  constructor( ){   
  } 


}



