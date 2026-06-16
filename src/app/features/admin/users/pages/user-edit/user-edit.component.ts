import { Component, inject, Input, signal } from '@angular/core'; 
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthState, User, UserRole } from '../../../../../core/models/users.models';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user.service';
//import { UserUiStateService } from '../../user-ui-state.service';

import { UserFormComponent } from "../user-form/user-form.component";
import { catchError, delay, filter, map, of, switchMap, tap } from 'rxjs';
import { LoadingComponent } from "../../../../../shared/components/ui/loading/loading.component";
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../../auth/auth.service';
import { UserStore } from '../../user.store';


@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, UserFormComponent, LoadingComponent],
  template: `

    <!-- <app-loading *ngIf="loading$ | async"></app-loading> -->
    <app-loading [texto]="msgLoading" *ngIf="userState().loading"></app-loading>

    <!-- <ng-container *ngIf="!(loading$ | async)"> con behaviourSubjet -->
    
 
    <!-- <div *ngIf="error$ | async as error"> -->
    <!-- <div *ngIf="errorSignal()">
        <div class="msj msjError">{{ errorSignal() }}</div>
    </div>     -->

    <app-user-form 
        *ngIf="!userState().loading"
        [mode]="mode"
        [user]="userState().selectedUser!"
        [roles]="roles"
        (save)="onSave($event)"
        (cancel)="onCancel($event)">
    </app-user-form>

  `

})
export class UserEditComponent {

  private userService = inject(UserService);
  private userStore = inject(UserStore);
  private route = inject(ActivatedRoute);
  id!:string

  roles: string[] = [];
  mode:string = 'edit'; // 'view' o 'edit'
  msgLoading : string = this.userStore.state().selectedUser ? 'Cargando data del Usuario' : 'Cargando';

  // public loadingSignal = signal<boolean>(true);

  readonly userState = this.userStore.state;
  readonly userEmpty = this.userService.userEmpty;
  
  // public usuario = toSignal(
  //     this.route.paramMap.pipe(
  //         delay(1400),
  //         tap(() => this.loadingSignal.set(true)),
  //         map(params => params.get('id') || ''),
  //         filter(id => !!id),
  //         switchMap(id => this.userService.getById(id).pipe(
  //           catchError(() => {
  //             this.router.navigate(['/admin/users']);
  //             return of(null);
  //           })
  //         )),
  //         tap(() => this.loadingSignal.set(false))
  //       ),
  //       { initialValue: this.userService.userEmpty }
  // );

  constructor( ) {}

  ngOnInit(): void {
    console.log("--- ngOnInit UserEditComponent");
    
    // 
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');      
      if (id) this.userStore.getUserById(id);
      this.mode='create'
    });

    this.roles = this.route.snapshot.data['roles'];
    // y esta para el modo
    
    this.route.queryParamMap
          .pipe(map(params => params.get('mode')))
          .subscribe(mode => {
            this.mode = mode!;
           });
           console.log("_______userState().selectedUser_____",this.userState().selectedUser)
  }
 
  onSave(user: User) {
      
      // this.userService.updateUser(updatedUser)
      //   .subscribe(() => {
      //       // problema, al refresh se sigue persistiendo el state, y no quiero eso, solo quiero que se muestre el mensaje al volver de edit a list, pero si hago refresh en list, no quiero que se siga mostrando el mensaje, para eso tengo que limpiar el state al entrar en list, y lo hago con un metodo del service que me limpia los estados de error y loading
      //       // mejor usar servicio que el state.
      //       if(updatedUser?.id){
      //           //tengo que actualizar el usuario logeado si es el mismo que el que actualizo
      //           if(this.authService.currentUser()?.id === updatedUser?.id) {
      //               this.authService.updateUserAuth({
      //                 'id':   updatedUser.id, 
      //                 'name': updatedUser.name, 
      //                 'email':updatedUser.email, 
      //                 'role': this.authService.getRole(updatedUser.role!) 
      //               });
      //           }
      //           this.userUiStateService.setState(updatedUser.id, 'update'); // Establece el state global de mensajes al volver a la lista
      //           this.router.navigate(['/admin/users']);
      //       }
      //   });

      if(this.userStore.state().selectedUser){
        this.msgLoading = 'Actualizando data'
        this.userStore.updateUser(user);
      }else{
        this.msgLoading = 'Insertando Usuario';
        this.userStore.createUser(user);
      }

          
  }

  onCancel(data: any) {
    this.userStore.cleanMsgState(true)  
  } 
    
}