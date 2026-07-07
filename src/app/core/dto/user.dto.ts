// lo que me viene del back y como tengo que enviarlo.

import { UserRole } from "../../features/admin/pages/users/models/user.model";
import { imageApiDto } from "./image.dto";

export interface userAccessDto {
  accessToken: string;
  user: UserDto;
}


export interface UserDto {
  id: string;

  user_name: string;
  first_name: string;
  last_name: string;
  email: string;
  password:string;
  is_active: boolean;

  role: UserRole; 

  created_at?: string;
  updated_at?: string;

  images_user:[imageApiDto]
}

export interface LoginRequestDto {
  username: string;
  password: string;
}


export interface ActionUserDto {
    is_active?: boolean;
    user_name?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    role?: string;
    updated_at?: string;
    created_at?: string;
    images_user?:[number];
}


