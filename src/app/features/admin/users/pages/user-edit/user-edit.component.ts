import { Component, Input } from '@angular/core'; 
import { FormBuilder, FormGroup } from '@angular/forms';
import { User, UserRole } from '../../../../../core/models/users.models';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user.service';

import { UserFormComponent } from "../user-form/user-form.component";
import { map, switchMap } from 'rxjs';
import { LoadingComponent } from "../../../../../shared/components/ui/loading/loading.component";


@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, UserFormComponent, LoadingComponent],

  template: `
    <PRE>id USER: {{ id }}</PRE>
    
    
  <app-user-form
    *ngIf="user; else loading "
    [user]="user"
    (save)="onSave($event)">
  </app-user-form>
  
  <ng-template #loading>
    <app-loading></app-loading>
  </ng-template>
  
  `

})
export class UserEditComponent {

  id!:string
  user!: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {

    this.route.paramMap.pipe(
      map(params => params.get('id') || ''),
      switchMap(id => this.userService.getById(id))
    ).subscribe(user => {
      this.user = user;
    });

  }
 
  onSave(updatedUser: User) {
     this.userService.update(updatedUser)
      //  .subscribe(() => {
      //     //volver a la lista y le paso info de lo que se ha actualizado para mostrar un mensaje o algo
      //     this.router.navigate(['/admin/users'], {
      //       state: {
      //         updatedId: updatedUser.id,
      //         action: 'update' 
      //       }
      //     });
      //  });  
       
  }


    
    
}