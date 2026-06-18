import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core'; 
import { User } from '../../../../../../core/models/users.models';
import { UserService } from '../../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStore } from '../../user.store';

import { LoadingComponent } from '../../../../../../shared/components/ui/loading/loading.component';
import { UserFormComponent } from '../user-form/user-form.component';

//import { UserUiStateService } from '../../user-ui-state.service';
 

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [CommonModule, UserFormComponent, LoadingComponent],
  template: `

    <app-loading [texto]="msgLoading" *ngIf="userState().loading"></app-loading>

    <app-user-form 
        *ngIf="!userState().loading"
        [user]="user"
        [roles]="roles"
        (save)="onSave($event)"
        (cancel)="onCancel($event)">
    </app-user-form>
  ` 
})
export class UserCreateComponent { 

  private userStore = inject(UserStore);
  
  readonly userState = this.userStore.state;

  user?: User; 
  roles: string[] = [];

  msgLoading : string = "Cargando"

  constructor(
    private userService: UserService, 
    private route: ActivatedRoute,
    private router: Router,
 //   private userUiStateService: UserUiStateService,
  ) { 
  } 

  ngOnInit(): void {
    this.user = this.userService.userEmpty;
    this.roles = this.route.snapshot.data['roles'];
  }

  onSave(newUser: User) {


    this.msgLoading = 'Insertando Usuario';
    this.userStore.createUser(newUser);

    
      // this.userService.createUser(newUser)
      //  .subscribe((userNew:User) => {
      //     //volver a la lista y le paso info de lo que se ha actualizado para mostrar un mensaje o algo
      //     // ya no , lo actualizo en la lista y listo, no hace falta volver a cargar toda la lista
      //     // this.router.navigate(['/admin/users'], {
      //     //   state: {
      //     //     userId: userNew.id,
      //     //     action: 'create' 
      //     //   }
      //     // });
      //     //this.userStateService.setState(userNew.id || '', 'create');
      //     this.router.navigate(['/admin/users']);
      //   });  
  }

       
  onCancel(data:any) {
    this.router.navigate(['/admin/users']);
  }



}