

// ✅ modelo para autenticación
//export type AuthUser = Omit<User, 'password'>;

import { Signal } from "@angular/core";


// la clase que implemente esta interface tiene que tener estas dos señales
export interface AuthState {
  currentUser: Signal<AuthUser | null>;
  isLogged  : Signal<boolean>;
}


export interface AuthStateModel {
  currentUser: AuthUser | null;
};


export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}

export interface User {
  id: string;

  // datos básicos
  name: string;
  password: string;
  email: string;

  // estado
  isActive: boolean;

  // roles / permisos
  role?: UserRole;
  permissions?: Permission[];  
  
  // auditoría
  readonly createdAt?: Date; // 🔒 no se debe cambiar
  updatedAt?: Date;          // ✏️ se añade en updates

  // opcional
  lastLogin?: Date;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  MANAGER = 'MANAGER'
}


export enum Permission {
  USERS_READ = 'users.read',
  USERS_CREATE = 'users.create',
  USERS_DELETE = 'users.delete'
}

