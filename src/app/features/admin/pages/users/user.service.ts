import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {  catchError, delay, map, Observable, tap } from "rxjs";
import { BaseService } from "../../../../core/services/base.service";
import { ActionUserDto, userAccessDto, UserDto } from "../../../../core/dto/user.dto";
import { UserMapper } from "./mappers/user.mapper";
import { ActionUser, UserActionUC, UserRole } from "./models/user.model";
import { ListUser } from "./models/list-user.model";

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService{
                          // extiende BaseService para los mensajes de error handleError

  private api = 'http://localhost:3000/users';

 // constructor(private http: HttpClient) {}
  private http = inject(HttpClient);
  
  public userEmpty: ActionUser = {
    id: '', 
    username: '',
    firstname: '',
    lastname: '',
    password: '',
    email: '', 
    isActive: true,  
    role: UserRole.USER, 
    images:[]
    //sin fechas
  };  

 

  // solo para listado....
  getUsuarios():Observable<ListUser[]> {
  
    return this.http.get<UserDto[]>(this.api).pipe(
      //delay(1000),   --> lo tengo en el Interceptor del loader

      // USANDO UN MAPPER !
      map((data) =>
        data.map(dto => UserMapper.toLister(dto))
      ),
 
      // map((data: UserDto[]) =>
      //   data.map((user: UserDto) => ({
      //     id: user.id,
      //     fullName: `${user.first_name} ${user.last_name}`, 
      //     email: user.email,
      //     isActive: user.is_active,
      //     role: user.role
      //   }))
      // ), 

      // YA no uso aqui el catchError, sino un INTERCEPTOR GLOGAL, 
      //   y los que no trato en el interceptor en el propio COMPONENTE !!...

      //catchError(this.handleError('getUsuarios'))  // es comun para toda la aplicacion
   
    )   

  }

  getById(id: string): Observable<ActionUser> {

    return this.http.get<UserDto>(`${this.api}/${id}`).pipe(
      //delay(1000), --> lo tengo en el Interceptor del loader
      tap(user => {
        //console.log('USER:', user);
      }),
      map(x  => UserMapper.toSelect(x)), 
       
      // YA no uso aqui el catchError, sino un INTERCEPTOR GLOGAL, 
      //   y los que no trato en el interceptor en el propio COMPONENTE !!...
      
      //catchError(this.handleError('getById'))

      // catchError(err => {
      //   if (err.status === 404)  
      //     return throwError(() => new Error("❌ Usuario no encontrado"));
      //   return throwError(() => new Error('❌ Error cargando usuario'));
      // })
    );

  }

  deleteById(id: string): Observable<void> {    
    
    return this.http.delete<void>(`${this.api}/${id}`).pipe(
      //delay(1000),--> lo tengo en el Interceptor del loader

      // YA no uso aqui el catchError, sino un INTERCEPTOR GLOGAL, 
      //   y los que no trato en el interceptor en el propio COMPONENTE !!...


      //catchError(this.handleError('deleteById'))
      // catchError(err => {
      //    return throwError(() => err);  
      // })
    );  

  }

  updateUser(user: ActionUser): Observable<UserActionUC> {

    const userDto : ActionUserDto = UserMapper.toUpdateDto(user);

    return this.http.patch<any>(`${this.api}/${user.id}`, userDto).pipe(
      //delay(1000),--> lo tengo en el Interceptor del loader
      tap(data => {
       console.log('service --> USER modified service',data);
      }),
    // USANDO UN MAPPER ! de DTO back a MODEL    
    // PARA DEVOLVER
      map(x  => UserMapper.toActionUser(x)),            
      // map((user) => ({
      //   id: user.id,
      //   username: user.user_name,
      //   firstname : user.firs_tname,
      //   lastname:user.last_name,
      //   email: user.email,
      //   isActive: user.is_active,
      //   role: user.role,
      // })),       
      
      // YA no uso aqui el catchError, sino un INTERCEPTOR GLOGAL, 
      //   y los que no trato en el interceptor en el propio COMPONENTE !!...
      
      
      //catchError(this.handleError('updateUser'))
      
      // catchError(err => {
      //   if (err.status === 404)  
      //     return throwError(() => new Error("❌ Usuario no encontrado"));
      //   return throwError(() => new Error('❌ Error modificando usuario'));
      // })
    );  

  }

  createUser(user: ActionUser): Observable<UserActionUC> {

     const userDto : ActionUserDto = UserMapper.toCreateDto(user);

     return this.http.post<userAccessDto>(this.api, userDto).pipe(
      //delay(1000),--> lo tengo en el Interceptor del loader
      tap(data => {
        console.log('🆗__________________USER CREADO______________________',data);
      }),
      // USANDO UN MAPPER ! de model A DTO back
      // envio 2 objetos de vuelta ... 
      // PARA DEVOLVER
      
      map(({user}) => UserMapper.toActionUser(user)),            
      // map(({user}) => ({
      //   id: user.id,
      //   username: user.user_name,
      //   firstname : user.first_name,
      //   lastname:user.last_name,
      //   email: user.email,
      //   isActive: user.is_active,
      //   role: user.role,
      // })),       
     //devuelvo lo que necesito, no accestoken ,  user {....}
      
    // YA no uso aqui el catchError, sino un INTERCEPTOR GLOGAL, 
    //   y los que no trato en el interceptor en el propio COMPONENTE !!...
     
     //catchError(this.handleError('createUser'))
   
    );

  }  

}
