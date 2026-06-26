import { computed, effect, inject, Injectable,   signal } from "@angular/core";
import { UserService } from "../admin/pages/users/user.service";
import { HttpClient } from "@angular/common/http";
import { catchError, delay, map, Observable, of, take, tap, throwError } from "rxjs";
import { BaseService } from "../../core/services/base.service";
import { ApiUser, UserRole } from "../admin/pages/users/models/user.model";
import { AuthState, AuthStateModel, AuthUser } from "./models/auth.model";

 // BaseService ES PARA LOS ERRRORES !! 

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService implements AuthState {

  private apiAuth = 'http://localhost:3000/login';
  private apiRegister = 'http://localhost:3000/register';

  private _state = signal<AuthStateModel>({
    currentUser:null
  })

  state = this._state.asReadonly();

  currentUser      = computed( ()=> this.state().currentUser );
  isAdmin          = computed(() => this.state().currentUser?.role === UserRole.ADMIN);  
  isLogged         = computed(() => this.state().currentUser !== null); // --> ES LO MISMO  !!this.currentUser());
  countNotified    = computed(() => this.state().currentUser ? 12 : 0); 

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
  private userService = inject(UserService); 
 
  constructor() {
    super();
    console.log("___ AUTH INIT  constructor")
    
    this.initFromStorage();

    
    // setInterval(() => {
    //   this._now.set(Date.now());
    // }, 1000);

 
  }
 
    
  private initFromStorage() {

    // 1 - tengo que sacar la info del storage 
    // 2 - validar el token expired
    // 3 - decodifica token
    // 4 - buscar el id del user 
    // 5 - logarlo si.

    //1
    const token = localStorage.getItem('token');

    console.log("___ AUTH ____________initFromStorage___token__",token)

    if ( !token ) return;

    try {
    //2
      if (this.isTokenExpired(token)) {
        console.log("___ AUTH ____________this.isTokenExpired(token)")
        localStorage.removeItem('token');
        return;
      }

    //3
      const payload = this.decodeToken(token);

      console.log("___ AUTH ____________payload ___ ", payload)
    
    //4
        this.userService.getById(payload.sub).subscribe({
          next: (user) => {
            console.log("__ user userService.getById" , user)
    //5            
            this._state.update(state => ({
                                ...state,
                                currentUser: {
                                  "id":    user.id!,
                                  "name":  user.username!, 
                                  "email": user.email!,
                                  "role":  this.getRole(user.role!),
                                  "exp" : payload.exp
                                }
            }))
          },
          error: () => {
              console.log("___ error localStorage.removeItem('token')")  
              localStorage.removeItem('token');
          }
        }); 
   
    } catch (e) {
      localStorage.removeItem('token');
    }
  }
  
  private decodeToken(token:string):any{
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log("___ AUTH____TOKEN DECODE___", payload )
     return payload;
  }

  private isTokenExpired(token: string): boolean {
    try {
      // ✅ Obtener payload del JWT
      const payload = this.decodeToken(token);
      console.log("___ AUTH____isTokenExpired___", payload )
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

  updateUserAuth(user:AuthUser){
        this._state.update(state=> ({
            ...state, 
            currentUser:{
              id:   user.id, 
              name: user.name,
              email:user.email, 
              role: user.role!,
              exp : user.exp
            }
          })
        )
  }

  login(email: string, password: string ): Observable<any> {
    // Enviamos la petición POST pasándole la URL y el cuerpo con las credenciales
    return this.http.post<ApiUser>(this.apiAuth, {email,password}).pipe(
      // take(1) asegura que la petición se cierre sola en cuanto responda el servidor
      take(1),
      delay(1400),
      // tap() ejecuta lógica en segundo plano SIN modificar el flujo de datos original
      tap((respuesta: ApiUser) => {
        if (respuesta && respuesta?.accessToken) { 

          this.updateUserAuth(
            {
              'id':   respuesta.user.id+"", 
              'name': respuesta.user.username,
              'email':respuesta.user.email, 
              'role': this.getRole(respuesta.user.role!),
              'exp' : this.getExpToken(respuesta.accessToken)
            }
          );
          
          // ✅ SOLO el token se guarda manual
          localStorage.setItem('token', respuesta.accessToken);
          console.log('Sesión guardada en el servicio con éxito.', respuesta);

        }
      }),
      map(data => ({request:'ok'}
      )),
      catchError(this.handleError('loginUser'))      
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
      return this.http.post<any>(this.apiRegister,  { name, email, password }).pipe(
        take(1),
        delay(1400),
        tap((request) =>  console.log("___ AUTH ____ USER REGISTRADOOOOO",request) ),
        tap((request:ApiUser) => {
              this._state.update(state=>({
                ...state,
                currentUser : {
                  id: request.user.id,
                  name: name,
                  email: email,
                  role: UserRole.USER,
                  exp : this.getExpToken(request.accessToken)
                }
              }))
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
      this._state.update(state=> ({
          ...state, 
          currentUser:null
        }));
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

  getExpToken(token:string):number{
      const payload = this.decodeToken(token);
      console.log("___ AUTH____getExpToken___", payload )
      // ✅ Campo estándar del JWT (en segundos)
      const exp = payload.exp;
      if (!exp) return 0; // si no hay exp → inválido      
      return exp;
  }

  // hasPermission(permission: Permission): boolean {
  //   return this.user?.permissions?.includes(permission) ?? false;
  // }
  
}