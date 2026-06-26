import { Component} from '@angular/core';  
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
 


@Component({
  selector: 'app-profile',
  standalone: true,
  imports:[CommonModule],
  template: `
    <div class="container">
        <div class="col">
            <h3>Profile</h3>
            <p>This is the profile page of the application.</p>   
            <pre>{{ authService.currentUser() | json }}</pre>    
            
                 
        </div>
    </div>     
  `
})
export class ProfileComponent {  


  constructor(
    public authService:AuthService )
    {  }

 
 
  


}



