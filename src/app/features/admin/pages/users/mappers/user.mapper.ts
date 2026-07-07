import { UserDto } from '../../../../../core/dto/user.dto'; 
import { ActionUser, User, UserActionUC, UserRole } from '../models/user.model';
import { ListUser } from '../models/list-user.model';
import { ImageMapper } from '../../images/mappers/image.mapper';

export class UserMapper {

  // DTO -> MODEL
  static toLister(dto: UserDto): ListUser {
    console.log("____MAPPER toLister", dto)

    return {
        id: dto.id,
        email:     dto.email,
        isActive: dto.is_active,
        fullName: dto.first_name + " " + dto.last_name,
        role:     dto.role as UserRole,
    //   username:  dto.user_name,
    //   firstname: dto.first_name,
    //   lastname:  dto.last_name,

    //   password: '', // nunca viene del backend


    //   createdAt: dto.created_at ? new Date(dto.created_at) : undefined,
    //   updatedAt: dto.updated_at ? new Date(dto.updated_at) : undefined
    };
  }

  // DTO -> MODEL
  static toSelect(dto: UserDto): ActionUser {
   // console.log("____MAPPER toSelect", dto)
    return {
        id: dto.id,
        username: dto.user_name,
        firstname: dto.first_name,
        lastname:  dto.last_name,
        email: dto.email,
        isActive: dto.is_active,
        role: dto.role,
        password:dto.password,
        createdAt: dto.created_at ? new Date(dto.created_at) : undefined,
        updatedAt: dto.updated_at ? new Date(dto.updated_at) : undefined,
        images : dto.images_user ? dto.images_user.map(ImageMapper.toDomain) : undefined 
    };
  }


  // DTO -> MODEL
  static toActionUser(dto: UserDto):UserActionUC {
      //console.log("-------------------> MAPPER toActionUser", dto)
      return {
          userSelect:this.toSelect(dto),
          userList:this.toLister(dto)
      };
  }


  // MODEL -> DTO (para crear usuario)
  static toCreateDto(user: ActionUser) {
    return {
        is_active:user.isActive,
        user_name: user.username,
        first_name: user.firstname,
        last_name: user.lastname,
        password: user.password!,
        email: user.email,
        role: user.role,
        created_at: user.createdAt!.toISOString(),
    };
  }
  // MODEL -> DTO (para crear usuario)
  static toUpdateDto(user: ActionUser) {
    return {
        is_active:user.isActive,
        user_name: user.username,
        first_name: user.firstname,
        last_name: user.lastname,
        password: user.password,
        email: user.email,
        role: user.role,
        update_at: (new Date()).toISOString(),
    };
  }
  
  // frontend → listado
  static toList(user: User): ListUser {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      fullName: user.firstname + ' ' + user.lastname
    };
  }


}