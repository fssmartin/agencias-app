import { Component, DestroyRef, inject, Input, signal } from '@angular/core'; 
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user.service';
//import { UserUiStateService } from '../../user-ui-state.service';

import { UserFormComponent } from "../user-form/user-form.component";
import { catchError, combineLatest, delay, filter, map, of, switchMap, tap } from 'rxjs';
import { LoadingComponent } from "../../../../../../shared/components/ui/loading/loading.component";
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../../../auth/auth.service';
import { UserStore } from '../../user.store';
import { NotificationsComponent } from '../../../../../../shared/components/ui/notifications/notifications.component';
import { ActionUser } from '../../models/user.model';


@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, UserFormComponent, LoadingComponent, NotificationsComponent],
  template: `


  <!-- <pre>selectedUser,{{userState().selectedUser}}</pre>
  <pre>mode, {{mode | json}}</pre> -->

    <!-- <app-loading *ngIf="loading$ | async"></app-loading> -->
    <app-loading [texto]="msgLoading" *ngIf="userState().loading"></app-loading>

    <!-- <ng-container *ngIf="!(loading$ | async)"> con behaviourSubjet -->
    
    <!-- <div *ngIf="error$ | async as error"> -->

    <h4  *ngIf="!userState().loading">
        <span>{{   mode === 'view' ? 'Consulta Usuario' :  (  mode === 'edit' ? 'Editar Usuario' : 'Crear Usuario')  }}</span>

        <div class="msgInfo" *ngIf="userState().error">
            <div class="msj msjError">{{ userState().error }}</div>  
        </div>          
        <app-notifications></app-notifications>
    </h4>

<!-- <pre>{{userState().loading|json}}</pre>
<pre>{{userState().selectedUser!|json}}</pre>
<pre>{{mode|json}}</pre>
<pre>{{roles}}</pre> -->

    <app-user-form 
        *ngIf="!userState().loading"
        [mode]="mode"
        [error]= "userState().error" 
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
  mode:string = 'edit'; // 'view' , 'edit', create
  msgLoading : string = 'Cargando';

  readonly userState = this.userStore.state;
  readonly userEmpty = this.userService.userEmpty;
  
  
  private destroyRef = inject(DestroyRef); // ✅ CLAVE

  constructor( ) {}

  ngOnInit(): void {

        console.log("--- ngOnInit UserEditComponent");
  
        // me viene del resolver, en router
        this.roles = this.route.snapshot.data['roles'];

        this.mode  = this.route.snapshot.data['mode']; 
        if(this.mode === 'create') this.userStore.cleanMsgState(false);

        let id = this.route.snapshot.paramMap.get('id');
        console.log("id",id)
        this.msgLoading = 'Cargando data del Usuario'

        if(id)
           this.userStore.getUserById(id!);

        // combineLatest([this.route.paramMap, this.route.queryParamMap])
        //   .pipe(
        //     map(([param, queryParams])=>({
        //       id:param.get('id'),
        //       mode:queryParams.get('mode')
        //     }),
        //     takeUntilDestroyed(this.destroyRef) // ✅ ahora 
        //   )).subscribe(({id,mode})=>{
        //       console.log("id",id)
        //       console.log("mode",mode);
        //       this.mode = mode!;
        //       this.msgLoading = 'Cargando data del Usuario'
        //       if(id)
        //         this.userStore.getUserById(id!);
        //   });
     /*
        this.route.paramMap.subscribe(params => {
          const id = params.get('id');      
          //this.mode='create'
          console.log("_______id_____",id)
          if (id) {
              this.userStore.getUserById(id);
              this.msgLoading = 'Cargando data del Usuario'
          }
        });

        // y esta para el modo    
        this.route.queryParamMap
              .pipe(map(params => params.get('mode')))
              .subscribe(mode => {
                this.mode = mode!;
              });
              console.log("_______userState().selectedUser_____",this.mode,this.userState().selectedUser)
     */              
  }
 
  onSave(user: ActionUser) {      
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