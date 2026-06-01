import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { User, UserRole } from '../../../../../core/models/users.models';
import { AuthService } from '../../../../auth/auth.service';
import { UserService } from './../../user.service';
import { Router, RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { LoadingComponent } from "../../../../../shared/components/ui/loading/loading.component";



@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingComponent],
  template: `

    <h4>User List</h4> 

    <app-loading *ngIf="loading$ | async"></app-loading>

    <ng-container *ngIf="!(loading$ | async)">

        <div *ngIf="error$ | async as error">
            <div class="msj msjError">{{ error }}</div>
        </div> 
        
        
        <div *ngIf="successMessage" class="success">
          <div class="msj msjOk">{{ successMessage }}</div>  
        </div>


        <table
          *ngIf="users$ | async as users"
          class="listTable">
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th><button routerLink="/admin/users/create"  class="fRight btEnlace btCrear">Crear Usuario</button></th>
          </tr>
          <tr *ngFor="let user of users; trackBy: trackById">
            <td>
                {{ user.isActive ? '✅' : '❌' }}
                {{ user.role === 'ADMIN' ? '🛡️' : user.role === 'MANAGER' ? '📊' : '👤' }}
            </td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <button [routerLink]="['/admin/users/view', user.id]" title="Show" >  👁️</button>
              <button [routerLink]="['/admin/users/edit', user.id]" title="Edit">✏️</button>
              <button (click)="deleteUser(user)"  class="" >🗑️</button>
            </td>
          </tr>
          <tr>
            <td></td>
            <td  colspan="4" text-align="right">Total: <strong>{{ users.length }}</strong></td>
          </tr>
          <tr *ngIf="users?.length === 0">
            <td colspan="4" align="end" class="notFound">No users</td>
          </tr>
        </table>    
    </ng-container> 

    <!-- <pre>{{ auth.getUser()| json }}</pre> -->
  `
})
export class UserListComponent {
  selectedUser?: User;
  successMessage: string | null = null;
  private userService = inject(UserService);
  
  users$ = this.userService.users$;
  error$ = this.userService.error$;
  loading$ = this.userService.loading$;
  userEmpty?: User = this.userService.userEmpty;
 
  constructor(
    // public auth: AuthService,
    private router: Router )
  {}

  ngOnInit(): void {
 
    // me viene de edit , y se cual ha sido el id actualizado para hacer algun efecto jejeje    
    const { userId, action } = history.state || {};
    console.log('UserListComponent ngOnInit - history.state:', history.state);
    if ( userId && action) {  
      
      this.successMessage =  action === 'create' ? '✅ Usuario creado correctamente' : '✅ Usuario actualizado correctamente';

      setTimeout(() => {
        this.successMessage = null;
      }, 3000); // desaparece en 3s

    }
    this.userService.clearObservable(false); // Limpia estados al entrar a la lista
 
  }

  select(user: User) {
    this.selectedUser = user;
  }

  // Solo actualiza los que cambian
  trackById(index: number, user: User) {
    return user.id;
  }

  deleteUser(user: User) {
    if(!user.id) return;
    console.log("Usuario a eliminar:", user.id);
    this.userService.deleteById(user.id).subscribe();

  }





}