import { DestroyRef,  inject, Injectable } from "@angular/core";
import { UserService } from "../admin/pages/users/user.service";
import { HttpClient } from "@angular/common/http";
import { catchError, delay, map, Observable, of, take, tap } from "rxjs";
import { BaseService } from "../../core/services/base.service";
import { ActionUser, ApiUser, UserRole } from "../admin/pages/users/models/user.model";
import { AuthUser, AuthUserFull, JwtPayload } from "./models/auth.model";
import { userAccessDto, UserDto } from "../../core/dto/user.dto"; 

import { AuthMapper } from "./mappers/auth.mapper";
import { UserMapper } from "../admin/pages/users/mappers/user.mapper";

 // BaseService ES PARA LOS ERRRORES !! 

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService  {

  private apiUser =     'http://localhost:3000/users';
  private apiAuth =     'http://localhost:3000/login';
  private apiRegister = 'http://localhost:3000/register';

  public userAuthEmpty:AuthUserFull={
      id:    '',
      name:  '',
      email: '',
      role:  UserRole.USER,
      exp:null
  }


  // remainingSeconds = computed(() =>  {
  //       const user = this.state().currentUser;
  //       const now = this._now();

  //       console.log("user?.exp___________________",user?.exp)

  //       if (!user?.exp) return 0;
  //       return Math.max(0, Math.floor((user.exp * 1000 - now) / 1000));
  // });   
  // remainingFormatted = computed(() => {
  //   const seconds = this.remainingSeconds();
  //   if (seconds <= 0) return 'Expirado';
  //   const minutes = Math.floor(seconds / 60);
  //   const sec = seconds % 60;

  //   return `${minutes}:${sec.toString().padStart(2, '0')}`;
  // });  
  // timeExpired = computed(() => this.remainingSeconds() <= 0);
  // iconByRole  = computed(() => {
  //      const user = this.state().currentUser;
  //      return user ? this.getIconRole(user.role) : '👤'
  // });

  // private _now = signal(Date.now());
 
  private http = inject(HttpClient); 
    // private userService = inject(UserService); 
    

    // private destroyRef = inject(DestroyRef);
  
    constructor() {
      super();
      // no hacemos nada ... lo hacemos en el constructor del store

      console.log("0 ___ AUTH SERVICE - INIT constructor")
    
      // this.initFromStorage();

      // setInterval(() => {
      //   this._now.set(Date.now());
      // }, 1000);

  }
     
  private initFromStorage_A() {

    // 1 - tengo que sacar la info del storage 
    // 2 - validar el token expired
    // 3 - decodifica token
    // 4 - buscar el id del user 
    // 5 - logarlo si.
 
  }

  initFromStorage():Observable<AuthUserFull>{

      const token = this.getStoredToken();

      console.log("1 ___ AUTH ____________ initFromStorage___token__",token)

      if (!token) {
        console.log("_____ AUTH ____________ NO HAY TOKEN")
        return of();
      }
    
      console.log("2 ___ AUTH ____________decodeToken")
      const payload = this.decodeToken(token); 
   
      if (this.isTokenExpired(payload)) {
        console.log("___ AUTH ____________ token expired")
        this.clearSession()
        return of();
      } 

      return this.loadUser(payload);
  }

  private loadUser(payload:JwtPayload):Observable<AuthUserFull>{

      return  this.http.get<UserDto>(`${this.apiUser}/${payload.sub}`).pipe(
          //delay(3000), --> se lo pongo en el interceptor !
          tap(user => {
            console.log("-- USER 1",user)
          }),
          map(x  => AuthMapper.DtoAuthtoUser(x, payload.exp  )), 
          tap(user => {                
            console.log('-- USER 2', user);
          }),
          
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

  private getStoredToken():string|null{
    return localStorage.getItem('token')
  }
  
  private decodeToken(token:string):JwtPayload{
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log("____TOKEN DECODE___", payload )
     return payload;
  }

  private isTokenExpired(payload: JwtPayload): boolean {
    try {
      // // ✅ Obtener payload del JWT
      // const payload = this.decodeToken(token);
      // ✅ Campo estándar del JWT (en segundos)
      const exp = payload.exp;

      if (!exp) return true; // si no hay exp → inválido      
      const buffer = 5 * 1000; // 5 segundos 
      
      // ✅ comparar con tiempo actual (ms vs segundos)
      return Date.now() > (exp * 1000 - buffer);

    } catch (error) {
      // ✅ token mal formado o corrupto
      return true;
    }
  }
 
  getExpToken(token:string):number{
      const payload = this.decodeToken(token);
      console.log("___ AUTH____getExpToken___", payload )
      // ✅ Campo estándar del JWT (en segundos)
      const exp = payload.exp;
      if (!exp) return 0; // si no hay exp → inválido      
      return exp;
  }

  login(email: string, password: string ): Observable<AuthUser> {
    return this.http.post<userAccessDto>(this.apiAuth, {email,password}).pipe(
      // take(1) asegura que la petición se cierre sola en cuanto responda el servidor
      take(1),
      //delay(1400),--> lo tengo en el Interceptor del loader
      tap((request: userAccessDto) => {
            localStorage.setItem('token', request.accessToken);
            console.log('✅ Sesión guardada localstorage', request.accessToken); 
      }),
      map(x  => AuthMapper.DtoAuthtoUser(x.user,this.getExpToken(x.accessToken))),  

// map(x  => AuthMapper.dtoAuthtoUser(x)),    
         
      // tap() ejecuta lógica en segundo plano SIN modificar el flujo de datos original
      // tap((respuesta: userAccessDto) => {
      //   if (respuesta && respuesta?.accessToken) { 
      //     this.updateUserAuth(
      //       {
      //         'id':   respuesta.user.id, 
      //         'name': respuesta.user.user_name,
      //         'email':respuesta.user.email, 
      //         'role': this.getRole(respuesta.user.role!),
      //         'exp' : this.getExpToken(respuesta.accessToken)
      //       }
      //     );
          

      //   }
      // }),
      //map(data => ({request:'ok'})),

      // YA no uso aqui el catchError, sino un INTERCEPTOR GLOGAL, 
      //   y los que no trato en el interceptor en el propio COMPONENTE !!...

      // catchError(this.handleError('loginUser'))      

      // catchError((error) => {
      //   console.log('Error de red detectado en el servicio:', error);
      //   if (error.status === 0){
      //       return throwError(() => new Error('❌ Problemas con la BD'));
      //   }
      //   return throwError(() => new Error('❌ '+error.error));
      // })       
    );
  } 

  register(name:string, email: string, password: string): Observable<any> {
      // const id = crypto.randomUUID();
      // console.log("Registro user ok , ",id);
      return this.http.post<ApiUser>(this.apiRegister,  { name, email, password }).pipe(
        take(1),
        delay(1400),
        tap((request) =>  console.log("___ AUTH ____ USER REGISTRADOOOOO",request) ),
        tap((request:ApiUser) => {
              // this._state.update(state=>({
              //   ...state,
              //   currentUser : {
              //     id: request.user.id,
              //     name: name,
              //     email: email,
              //     role: UserRole.USER,
              //     exp : this.getExpToken(request.accessToken)
              //   }
              // }))
              localStorage.setItem('token', request.accessToken);
              console.log('Sesión guardada en el servicio con éxito.', request);
            }
        ),
        map(data=>({ data:'ok' })  ),
        catchError(this.handleError('registerUser'))
        // catchError((error) => {
        //     console.log('Error registro usuario:', error);
        //     if (error.status === 0){
        //         return throwError(() => new Error('❌ Problemas con la BD'));
        //     }
        //     return throwError(() => new Error('❌ '+error.error));
        // })           
    );
  }

  logout() { 
    this.clearSession();
  }

  private clearSession(){
    localStorage.removeItem('token');
  }

  private getIconRole(role:string){
    switch (role) {
      case UserRole.ADMIN:return '🛡️';
      case UserRole.MANAGER:return '📊';
      default:return '👤';
    }
  }

  getRole(role:string){
    switch (role) {
      case UserRole.ADMIN:return UserRole.ADMIN;
      case UserRole.MANAGER:return UserRole.MANAGER;
      default:return UserRole.USER;
    }
  } 

  // hasPermission(permission: Permission): boolean {
  //   return this.user?.permissions?.includes(permission) ?? false;
  // }
  
}