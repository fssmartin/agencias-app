import { Signal } from "@angular/core";
import { UserRole } from "../../admin/pages/users/models/user.model";

// la clase que implemente esta interface tiene que tener estas dos señales
export interface AuthState {
  currentUser: Signal<AuthUser | null>;
  isLogged  : Signal<boolean>;
}

//signal
export interface AuthStateModel {
  currentUser: AuthUserFull | null;
  loading:boolean,
  error:string | null
};

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthUserFull extends AuthUser {
  exp?:number|null 
}
 

export interface JwtPayload {
   sub:string;
   exp:number;
}
