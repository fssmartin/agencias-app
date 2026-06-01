import { Component, inject, Input } from '@angular/core'; 
import { FormBuilder, FormGroup } from '@angular/forms';
import { User, UserRole } from '../../../../../core/models/users.models';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user.service';

import { UserFormComponent } from "../user-form/user-form.component";
import { filter, map, switchMap } from 'rxjs';
import { LoadingComponent } from "../../../../../shared/components/ui/loading/loading.component";


@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, UserFormComponent, LoadingComponent],
  template: `

    <app-loading *ngIf="loading$ | async"></app-loading>

    <ng-container *ngIf="!(loading$ | async)">

        <div *ngIf="error$ | async as error">
            <div class="msj msjError">{{ error }}</div>
        </div>    

        <app-user-form
          *ngIf="user;"
          [user]="user"
          (save)="onSave($event)"
          (cancel)="onCancel($event)">
        </app-user-form>

    </ng-container> 

  `

})
export class UserEditComponent {

  private userService = inject(UserService);

  id!:string
  user!: User;

  users$ = this.userService.users$;
  error$ = this.userService.error$;
  loading$ = this.userService.loading$;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log("--- ngOnInit UserEditComponent");
      
    this.route.paramMap.pipe(
      map(params => params.get('id') || ''),
      filter((id): id is string => !!id),
      switchMap(id => this.userService.getById(id))
    ).subscribe(user => {
      console.log(user,"Usuario no encontrado");
      if (!user) {
        // Si no se encuentra el usuario, redirige a la lista o muestra un mensaje
        this.router.navigate(['/admin/users']);
        return;
      }
       this.user = user;
    });

  }
 
  onSave(updatedUser: User) {
      this.userService.updateUser(updatedUser)
       .subscribe(() => {
          //volver a la lista y le paso info de lo que se ha actualizado para mostrar un mensaje o algo
          this.router.navigate(['/admin/users'], {
            state: {
              userId: updatedUser.id,
              action: 'update' 
            }
          });
       });  
  }

  onCancel(data: any) {
          this.router.navigate(['/admin/users']);
  }


    
    
}