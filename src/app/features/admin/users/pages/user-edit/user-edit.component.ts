import { Component, inject, Input } from '@angular/core'; 
import { FormBuilder, FormGroup } from '@angular/forms';
import { User, UserRole } from '../../../../../core/models/users.models';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user.service';
import { UserUiStateService } from '../../userState.service'

import { UserFormComponent } from "../user-form/user-form.component";
import { filter, map, switchMap } from 'rxjs';
import { LoadingComponent } from "../../../../../shared/components/ui/loading/loading.component";


@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, UserFormComponent, LoadingComponent],
  template: `

    <!-- <app-loading *ngIf="loading$ | async"></app-loading> -->
    <app-loading *ngIf="loadingSignal()"></app-loading>

    <!-- <ng-container *ngIf="!(loading$ | async)"> con behaviourSubjet -->
    
    <ng-container *ngIf="!(loadingSignal())">

        <!-- <div *ngIf="error$ | async as error"> -->
        <div *ngIf="errorSignal()">
            <div class="msj msjError">{{ errorSignal() }}</div>
        </div>    

        <app-user-form *ngIf="user;"
            [mode]="mode"
            [user]="user"
            [roles]="roles"
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

  loadingSignal = this.userService.loadingSignal;
  errorSignal   = this.userService.errorSignal;
  
  users$ = this.userService.users$;
  //error$ = this.userService.error$;
  //loading$ = this.userService.loading$();

  roles: string[] = [];
  mode:string = 'edit'; // 'view' o 'edit'

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private UserUiStateService: UserUiStateService
  ) {}

  ngOnInit(): void {
    console.log("--- ngOnInit UserEditComponent");
    
    this.roles = this.route.snapshot.data['roles'];

    // Obtiene el ID del usuario desde la URL y carga los datos del usuario
    this.route.paramMap.pipe(
      map(params => params.get('id') || ''),
      filter((id): id is string => !!id),
      switchMap(id => this.userService.getById(id))
    ).subscribe(user => {
      if (!user) {
        console.log(user,"Usuario no encontrado");
        // Si no se encuentra el usuario, redirige a la lista o muestra un mensaje
        this.router.navigate(['/admin/users']);
        return;
      }
       this.user = user;
    });

    // y esta para el modo
    this.route.queryParamMap
          .pipe(map(params => params.get('mode')))
          .subscribe(mode => {
            this.mode = mode === 'view' ? 'view' : 'edit';
          });


  }
 
  onSave(updatedUser: User) {
      this.userService.updateUser(updatedUser)
       .subscribe(() => {
          //volver a la lista y le paso info de lo que se ha actualizado 
          // para mostrar un mensaje o algo
          // this.router.navigate(['/admin/users'], {
          //   state: {
          //     userId: updatedUser.id,
          //     action: 'update' 
          //   }
          // });
          // problema, al refresh se sigue persistiendo el state, y no quiero eso, solo quiero que se muestre el mensaje al volver de edit a list, pero si hago refresh en list, no quiero que se siga mostrando el mensaje, para eso tengo que limpiar el state al entrar en list, y lo hago con un metodo del service que me limpia los estados de error y loading
          // mejor usar servicio que el state.
            if(updatedUser?.id){
              this.UserUiStateService.setState(updatedUser.id, 'update'); // Establece el state global de mensajes al volver a la lista
              this.router.navigate(['/admin/users']);
            }
       });
          
  }

  onCancel(data: any) {
          this.router.navigate(['/admin/users']);
  }


    
    
}