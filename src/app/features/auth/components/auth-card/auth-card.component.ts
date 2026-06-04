import { Component} from '@angular/core';   

@Component({
  selector: 'app-auth-card',
  imports: [],
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
              <ng-content select="[body]"></ng-content>
            </div>

            <!-- FOOTER -->
            <div class="auth-footer" >
              <ng-content select="[footer]" class="fm_actions"></ng-content>
            </div>
            
        </div>

      </div>

  `
})
export class AuthCardComponent {  
  constructor( ){  }
}



