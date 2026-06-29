import {  AuthUserFull } from "../models/auth.model";
import {  UserDto } from "../../../core/dto/user.dto";
 

export class AuthMapper {

  // DTO -> MODEL
 
  static DtoAuthtoUser(dto: UserDto,exp:number): AuthUserFull {

    console.log("____MAPPER toLister", dto)
    
    return {
        id: dto.id,
        name: dto.user_name,
        email: dto.email,
        role: dto.role,        
        exp : exp
    };

  } 

}