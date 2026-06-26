
// import { Signal } from "@angular/core";


// // la clase que implemente esta interface tiene que tener estas dos señales
// export interface AuthState {
//   currentUser: Signal<AuthUser | null>;
//   isLogged  : Signal<boolean>;
// }

// //signal
// export interface AuthStateModel {
//   currentUser: AuthUser | null;
// };


// export interface AuthUser {
//   id: string;
//   name: string;
//   email: string;
//   role: UserRole;
//   exp?:number
// }

// // user full -> login back api
// export interface ApiUser {
//   accessToken: string;
//   user: User;
// }

 

// export interface User {
//   id: string;

//   // datos básicos
//   username : string;
//   firstname: string;
//   lastname: string;
//   password: string;
//   email: string;

//   // estado
//   isActive: boolean;

//   // roles / permisos
//   role: UserRole; 
  
//   // auditoría
//   createdAt?: Date; // 🔒 no se debe cambiar
//   updatedAt?: Date;          // ✏️ se añade en updates
// }

// export interface ListUser {
//   id: string;
//   fullName?: string;
//   email: string;
//   isActive: boolean;
//   role: UserRole;
// }


// //  userSelected --> show / update / 
// export interface ActionUser {
//   id?: string;
//   username: string;
//   firstname: string;
//   lastname: string;
//   email: string;
//   isActive: boolean;
//   role: UserRole;
//   password?:string;
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// export interface UserState  {
//   data: ListUser[];
//   selectedUser: ActionUser | null;
//   loading: boolean;
//   error: boolean;
// };

// export interface userActionUC{
//   userSelect:ActionUser,
//   userList:ListUser
// }


// export enum UserRole {
//   ADMIN = 'ADMIN',
//   USER = 'USER',
//   MANAGER = 'MANAGER'
// }


// export enum Permission {
//   USERS_READ = 'users.read',
//   USERS_CREATE = 'users.create',
//   USERS_DELETE = 'users.delete'
// }

