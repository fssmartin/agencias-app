import { Component} from '@angular/core';  
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-auth-card',
  imports: [RouterLink],
  standalone: true,
  template: `

    <div class="auth-container">
      <div class="auth-card">

        <!-- HEADER -->
        <div class="auth-header">
          <ng-content select="[header]"></ng-content>
        </div>

        <!-- BODY -->
        <div class="auth-body">
          <ng-content></ng-content>
        </div>

        <!-- FOOTER -->
        <div class="auth-footer">
          <ng-content select="[footer]"></ng-content>
        </div>

    </div>

  `
})
export class AuthCardComponent {  
  constructor( ){  }

}



