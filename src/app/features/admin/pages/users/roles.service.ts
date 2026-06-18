
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserRole } from '../../../../core/models/users.models';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  // por ahora... en un proyecto real esto vendría de una API  
  myRoles: UserRole[] = [UserRole.USER, UserRole.ADMIN, UserRole.MANAGER];

  getRoles(): Observable<UserRole[]> {
    // 🔥 aquí normalmente iría HTTP
    return of(this.myRoles);
  }
}

