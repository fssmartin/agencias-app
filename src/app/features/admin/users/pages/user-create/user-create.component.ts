import { CommonModule } from '@angular/common';
import { Component } from '@angular/core'; 
import { UserFormComponent } from '../user-form/user-form.component';
import { User, UserRole } from '../../../../../core/models/users.models';
import { USERS_ROUTES } from '../../users.routes';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
 


@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [CommonModule, UserFormComponent],
  template: `
    <app-user-form 
        [user]="user"
        (save)="onSave($event)">
    </app-user-form>
  ` 
})
export class UserCreateComponent {  
 
  user?: User; 

  constructor(
    private userService: UserService,
    private router: Router){ 
  } 

  ngOnInit(): void {  
    this.user = this.userService.userEmpty;
  }

  onSave(newUser: User) {
     this.userService.create(newUser)
       .subscribe(() => {
          //volver a la lista o mostrar mensaje
          this.router.navigate(['/admin/users']);
       }); 
  }

}