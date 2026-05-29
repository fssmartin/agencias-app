import { Injectable } from "@angular/core";
import { Permission, User, UserRole } from "../../core/models/users.models";

    
@Injectable({ providedIn: 'root' })
export class AuthService {

 // private user: User | null = null;

  private user: User = {
    id: '1',
    name: 'Fernando',
    email: 'test@test.com',
    permissions: [Permission.USERS_READ, Permission.USERS_CREATE],
    role: UserRole.ADMIN,
    isActive: true,
    createdAt: new Date()   
  };


  setUser(user: User) {
    this.user = user;
  }

  getUser(): User | null {
    return this.user;
  }

  hasPermission(permission: Permission): boolean {
    return this.user?.permissions?.includes(permission) ?? false;
  }
}
