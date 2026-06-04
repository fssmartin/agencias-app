import { computed, Injectable, Signal, signal } from "@angular/core";
import { AuthState, AuthUser, User, UserRole } from "../../core/models/users.models";

@Injectable({ providedIn: 'root' })
export class AuthService implements AuthState {

  currentUser  = signal<AuthUser | null>(null);
  isAdmin    = computed(() => this.currentUser()?.role === UserRole.ADMIN);  
  isLogged   = computed(() => this.currentUser() !== null);
  iconByRole = computed(() => {
    const user = this.currentUser();
    if (!user) return '';
    switch (user.role) {
      case UserRole.ADMIN:
        return '🛡️';
      case UserRole.MANAGER:
        return '📊';
      default:
        return '👤';
    }
  });

  login(email: string, password: string): boolean { 
      this.currentUser.set({
        id: '2',
        name: 'Luis Garcia',
        email: 'luis.garcia@example.com',
        role: UserRole.ADMIN
      }); 
      return true;  
  }

  register(name:string, email: string, password: string): boolean {
      const id = Date.now() + '-' + Math.random().toString(36).slice(2);
      console.log("Registro user ok , ",id)
      return true;
  }

  logout() {
    this.currentUser.set(null);
  }
  
  
  // hasPermission(permission: Permission): boolean {
  //   return this.user?.permissions?.includes(permission) ?? false;
  // }
  
}