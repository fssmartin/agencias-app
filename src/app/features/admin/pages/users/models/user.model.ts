import { BaseImage } from "../../images/models/image.model";
import { ListUser } from "./list-user.model";

// user full -> login back api
export interface ApiUser {
    accessToken: string;
    user: User;
}

export interface BaseUser{
    id: string;
    email: string;
    isActive: boolean;
    role: UserRole;   
}


export interface User extends BaseUser{
    username : string;
    password?: string; //al update user, no dejo modificar password
    firstname: string;
    lastname: string;
    createdAt?: string;  
    updatedAt?: string;  // ✏️ se añade en updates
    images?   :BaseImage[];
}

export interface UserState  {
  data: ListUser[];
  selectedUser: ActionUser | null;
  loading: boolean;
  error: boolean;
};


// GENERICO y ya no estaria por pages si no q me serviria para todos 
// y no tendria que estar limpiando los states de todos , solo 1 ??

// export enum ApiStatus {
//   Loading = 'LOADING',
//   Success = 'SUCCESS',
//   Error = 'ERROR'
// }

// interface ApiState<T, P> {
//   data: T | null;
//   selectedItem: P | null;
//   status: ApiStatus;
// }


// const state: ApiState<User[], User> = {
//   status: ApiStatus.Success,
//   data: [
//     { id: 1, name: 'Fernando' },
//     { id: 2, name: 'Ana' }
//   ],
//   selectedItem: {
//     id: 1,
//     name: 'Fernando'
//   }
// };


//  userSelected --> show / update / 
// El partial hace que toodos sean opcionales
export type ActionUser = Partial<User>;

export interface UserActionUC{
  userSelect:ActionUser,
  userList:ListUser
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

