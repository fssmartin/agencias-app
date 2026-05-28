import { CommonModule } from '@angular/common';
import { Component } from '@angular/core'; 
import { User, UserRole } from '../../models/users.models';
import { AuthService } from '../../../../auth/auth.service';
import { RouterLink } from '@angular/router';
 


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `

    <button routerLink="/admin/users/create"  class="fRight">Crear Usuario</button>

    <table>
      <tr>
        <th>Status</th>
        <th>Name</th>
        <th>Email</th>
        <th></th>
      </tr>
      <tr *ngFor="let user of users; trackBy: trackById">
        <td>{{ user.isActive ? 'Active' : 'Inactive' }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>
          <button [routerLink]="['/admin/users/edit', user.id]" >  👁️</button>
          <button [routerLink]="['/admin/users/edit', user.id]" >✏️</button>          
          <button (click)="deleteUser(user)"  class="" >🗑️</button>
        </td>
      </tr>
      <tr *ngIf="users.length === 0">
        <td colspan="4" align="center" class="notFound">No users</td>
      </tr>
    </table>
    
    <pre>{{ auth.getUser()| json }}</pre>

  `
})
export class UserListComponent {  
  selected?: User;

    users: User[] = [
      { id: '1', name: 'Pedro Vila', email: 'pedro.vila@example.com', isActive: true, role: UserRole.USER, createdAt: new Date() },
      { id: '2', name: 'Luis Garcia', email: 'luis.garcia@example.com', isActive: true, role: UserRole.ADMIN, createdAt: new Date() },
      { id: '3', name: 'Belen Perez', email: 'belen.perez@example.com', isActive: false, role: UserRole.MANAGER, createdAt: new Date() }
    ];

  constructor(public auth: AuthService) {}
 

  ngOnInit(): void {  
  
  }

  select(user: User) {
    this.selected = user;
  }

  // Solo actualiza los que cambian
  trackById(index: number, user: User) {
    return user.id;
  }

  deleteUser(user: User) {
    console.log("Usuario a eliminar:", user.id);
    this.users = this.users.filter(u => u.id !== user.id);
  }
   
    
}