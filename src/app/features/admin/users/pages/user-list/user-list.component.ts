import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { User, UserRole } from '../../models/users.models';
import { AuthService } from '../../../../auth/auth.service';
import { UserService } from './../../user.service';
import { RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { LoadingComponent } from "../../../../../shared/components/ui/loading/loading.component";



@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingComponent],
  template: `

    <h4>User List</h4>

    <table *ngIf="users$ | async as users; else loading" class="listTable" >
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
      <tr *ngIf="users?.length === 0">
        <td colspan="4" align="center" class="notFound">No users</td>
      </tr>
    </table>

    <ng-template #loading>
      <app-loading></app-loading>
    </ng-template>

    <pre>{{ auth.getUser()| json }}</pre>
  `
})
export class UserListComponent {
  selectedUser?: User;
  users$: Observable<User[]> | undefined;
  userEmpty?: User;

  constructor(
    public auth: AuthService,
    private userService: UserService ) {}

  ngOnInit(): void {
    this.userEmpty = this.userService.userEmpty;
    this.users$ = this.userService.getAll();
  }

  select(user: User) {
    this.selectedUser = user;
  }

  // Solo actualiza los que cambian
  trackById(index: number, user: User) {
    return user.id;
  }

  deleteUser(user: User) {
    console.log("Usuario a eliminar:", user.id);
    this.users$ = this.userService.delete(user.id!)
      .pipe(
        // Refrescar la lista después de eliminar
        switchMap(() => this.userService.getAll())
      );
  }


}