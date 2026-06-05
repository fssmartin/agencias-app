import { CommonModule } from '@angular/common';
import { Component } from '@angular/core'; 
import { UserFormComponent } from '../user-form/user-form.component';
import { User } from '../../../../../core/models/users.models';
import { UserService } from '../../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserUiStateService } from '../../userState.service';
 


@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [CommonModule, UserFormComponent],
  template: `
    <app-user-form 
        [user]="user"
        [roles]="roles"
        (save)="onSave($event)"
        (cancel)="onCancel($event)">
    </app-user-form>
  ` 
})
export class UserCreateComponent {  
 
  user?: User; 
  roles: string[] = [];

  constructor(
    private userService: UserService,
    private userStateService: UserUiStateService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
  } 

  ngOnInit(): void {  
    this.user = this.userService.userEmpty;
    this.roles = this.route.snapshot.data['roles'];
  }

  onSave(newUser: User) {
      this.userService.createUser(newUser)
       .subscribe((userNew:User) => {
          //volver a la lista y le paso info de lo que se ha actualizado para mostrar un mensaje o algo
          // ya no , lo actualizo en la lista y listo, no hace falta volver a cargar toda la lista
          // this.router.navigate(['/admin/users'], {
          //   state: {
          //     userId: userNew.id,
          //     action: 'create' 
          //   }
          // });
          this.userStateService.setState(userNew.id || '', 'create');
          this.router.navigate(['/admin/users']);
        });  
  }

       
  onCancel(data:any) {
          this.router.navigate(['/admin/users']);
  }



}