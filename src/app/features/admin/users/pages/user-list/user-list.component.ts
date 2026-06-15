import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { User } from '../../../../../core/models/users.models';
import { Router, RouterLink } from '@angular/router';
import { LoadingComponent } from "../../../../../shared/components/ui/loading/loading.component";

import { UserUiStateService } from '../../user-ui-state.service';
import { UserService } from '../../user.service';
import { BehaviorSubject, catchError, combineLatest, delay, map, of, startWith } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../../auth/auth.service';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingComponent],
  template: `

<!--

    APRENDER HACER UNA COMPUTED STATE  -- Que unifique el loading, error y success..

    y luego pregunte por .state()==='loading'
                          .state()==='error'
                          .state()==='success'  

-->
    <h4><span>User List</span>
       <div class="msgInfo">
            <div *ngIf="!userState()?.loading && successMessage" class="success">
                <div class="msj msjOk">{{ successMessage }}</div>  
            </div>
            <!-- <div *ngIf="error$ | async as error" class="error"> -->
            <div *ngIf="!userState()?.loading && userState()?.error" class="error">
                <div class="msj msjError">{{ userState()?.error }}</div>
            </div> 
        </div>
    </h4> 

    <!-- <app-loading *ngIf="loading$ | async"></app-loading> -->
    <app-loading  [texto]="'Usuarios'" *ngIf="userState()?.loading"></app-loading>
 

    <!-- <ng-container *ngIf="!(loading$ | async)"> -->
    <ng-container  *ngIf="!userState()?.error && !userState()?.loading">

        <!-- <table *ngIf="sortedUsers$ | async as users" -->
        <table 
          class="listTable">
          <tr>
            <th></th>
            <th (click)="sortBy('name')">
                Name
              <!-- <span *ngIf="(sortField$ | async) === 'name'">
                {{ (sortDirection$ | async) === 'asc' ? '▲' : '▼' }}
              </span> -->
            </th>
            <th (click)="sortBy('email')">
                Email
              <!-- <span *ngIf="(sortField$ | async) === 'email'">
                {{ (sortDirection$ | async) === 'asc' ? '▲' : '▼' }}
              </span> -->
            </th>
            <th><button routerLink="/admin/users/create"  class="fRight btEnlace btCrear">Crear Usuario</button></th>
          </tr>
          <tr *ngFor="let user of userState()?.data; trackBy: trackById"
              [ngClass]="{ 'highlight-row': user.id === highlightedUserId }">
            <td>
                {{ user.isActive ? '✅' : '❌' }}
                {{ user.role === 'ADMIN' ? '🛡️' : user.role === 'MANAGER' ? '📊' : '👤' }}
            </td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <button [routerLink]="['/admin/users/edit', user.id]"
                      [queryParams]="{ mode: 'view' }" title="Show">
                      <i class="fa-solid fa-eye"></i></button>
              <button [routerLink]="['/admin/users/edit', user.id]" 
                       [queryParams]="{ mode: 'edit' }" title="Edit">
                       <i class="fa-solid fa-pencil"></i></button>
              <button (click)="deleteUser(user)" 
                      [ngClass]="user.id===authService.currentUser()?.id ? 'disabled' : ''"
                      [disabled]="user.id===authService.currentUser()?.id" >
                      <i class="fa-regular fa-trash-can"></i></button>
            </td>
          </tr>
          <tr *ngIf="userState()?.data?.length; else noUsers">
            <td></td>
            <td  colspan="4" text-align="right">Total: <strong>{{ userState()?.data?.length }}</strong></td>
          </tr>
          <ng-template #noUsers>
            <tr>
              <td colspan="5" class="notFound" style="text-align: center;">
                No users
              </td>
            </tr>
          </ng-template>
        </table>    
    </ng-container> 

    <!-- <pre>{{userState()| json }}</pre> -->
  `
})
export class UserListComponent {
  
  private userService = inject(UserService);
 
  selectedUser?: User;
  successMessage: string | null = null;
  highlightedUserId: string | null = null;

  // loadingSignal = this.userService.loadingSignal;
  // errorSignal   = this.userService.errorSignal;

  userEmpty?: User = this.userService.userEmpty;
 

  public userState = toSignal(
            this.userService.getUsuarios().pipe(
              delay(1400),
              map(data => ({ data, loading: false, error: null })),
              catchError(err => of({ data: [], loading: false, error: err.message })),
              // startWith define el estado exacto inicial del componente de manera síncrona
              startWith({ data: [], loading: true, error: null })
            )
  );

  sortField$ = new BehaviorSubject<keyof User>('name');
  sortDirection$ = new BehaviorSubject<'asc' | 'desc'>('asc');

  // sortedUsers$ = combineLatest([
  //   this.users$,
  //   this.sortField$,
  //   this.sortDirection$
  // ]).pipe(

  //       map(([users, field, direction]) => {
  //         return [...users].sort((a, b) => {
  //           const valueA = a[field]!;
  //           const valueB = b[field]!;

  //           let result = 0;

  //           if (valueA instanceof Date && valueB instanceof Date) {
  //             result = valueA.getTime() - valueB.getTime();
  //           } else if (typeof valueA === 'string' && typeof valueB === 'string') {
  //             result = valueA.localeCompare(valueB);
  //           } else if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
  //             result = Number(valueA) - Number(valueB);
  //           } else {
  //             result = valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
  //           }

  //           return direction === 'asc' ? result : -result;
  //         })
  //       })
  // )  
  
  constructor(
    private UserUiStateService: UserUiStateService,
    public authService:AuthService,
    private router: Router )
  {}

  ngOnInit(): void {
 
    // me viene de edit , y se cual ha sido el id actualizado para hacer algun efecto jejeje       
    //const { userId, action } = history.state || {};
    // console.log('UserListComponent ngOnInit - history.state:', history.state);

   const { userId, action } = this.UserUiStateService.consumeState() || {};   

    if ( userId && action) {  
          
      this.highlightedUserId = userId;
      this.successMessage = action === 'create'
        ? '✅ Usuario creado correctamente'
        : action === 'delete' ? '✅ Usuario borrado correctamente'
        : '✅ Usuario actualizado correctamente';

      setTimeout(() => {
        this.successMessage = null;
        this.highlightedUserId = null;
        this.UserUiStateService.cleanState();
      }, 3000); // desaparece en 3s


    }
   
  } 

  deleteUser(user: User) {
    if(!user.id) return;
    console.log("Usuario a eliminar:", user.id);
    this.userService.deleteById(user.id).subscribe();
    
  }
  
  select(user: User) {
    this.selectedUser = user;
  }

  //Solo actualiza los que cambian
  trackById(index: number, user: User) {
    return user.id;
  }
  //Cambiar orden
  sortBy(field: keyof User) {
    if (this.sortField$.value === field) {
      this.sortDirection$.next(
        this.sortDirection$.value === 'asc' ? 'desc' : 'asc'
      );
    } else {
      this.sortField$.next(field);
      this.sortDirection$.next('asc');
    }
  }




}