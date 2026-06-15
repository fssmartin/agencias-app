import { computed, effect, inject, Injectable,   signal } from "@angular/core";
import { AuthState, AuthStateModel, AuthUser, LoginResponse, User, UserRole } from "../../core/models/users.models";
import { UserService } from "../admin/users/user.service";
import { HttpClient } from "@angular/common/http";
import { catchError, delay, map, Observable, of, take, tap, throwError } from "rxjs";

 

@Injectable({ providedIn: 'root' })
export class AuthService implements AuthState {

  private apiAuth = 'http://localhost:3000/login';
  private apiRegister = 'http://localhost:3000/register';

  private _state = signal<AuthStateModel>({
    currentUser:null
  })

  state = this._state.asReadonly();

  currentUser   = computed( ()=> this.state().currentUser );
  isAdmin       = computed(() => this.state().currentUser?.role === UserRole.ADMIN);  
  isLogged      = computed(() => this.state().currentUser !== null); // --> ES LO MISMO  !!this.currentUser());
  countNotified = computed(() => this.state().currentUser ? 12 : 0); 
  iconByRole    = computed(() => {
       const user = this.state().currentUser;
       return user ? this.getIconRole(user.role) : '👤'
  });
 
  private http = inject(HttpClient); 
  private userService = inject(UserService); 
 
  constructor() {
    console.log("___ INIT constructor")
    
    this.initFromStorage();
 
  }

    
  private initFromStorage() {

    const token = localStorage.getItem('token');

    console.log("____________initFromStorage___token__",token)

    if ( !token) return;

    try {
      // validar token
      if (this.isTokenExpired(token)) {
        console.log("____________this.isTokenExpired(token)")
        localStorage.removeItem('token');
        return;
      }

     const payload = this.decodeToken(token);
   

      console.log("_____________ payload ___ ", payload)

      //    ⚡ opción buena: cargar usuario desde backend
        this.userService.getById(payload.sub).subscribe({
          next: (user) => {
            console.log("__ user userService.getById" , user)
            this._state.update(state => ({
                                ...state,
                                currentUser: {
                                  "id":    user.id,
                                  "name":  user.name,
                                  "email": user.email,
                                  "role":  this.getRole(user.role!)
                                }
            }))
          },
          error: () => {
            console.log("___ error localStorage.removeItem('token')")  
            localStorage.removeItem('token')
          }
        }); 
   
    } catch (e) {
      localStorage.removeItem('token');
    }
  }
  
  // isAuthenticated():boolean{
  //   const token = this.getToken();
  //   if(!token){
  //     return false;
  //   }
  //   const payload = JSON.parse(atob(token.split('.')[1]))
  //   const exp     = payload.exp * 1000;
  //   return Date.now() < exp; 
  // }
  

  // isAuthenticated(): boolean {
  //   const token = localStorage.getItem('token');
  //   if (!token) return false;    
  //   return !this.isTokenExpired(token);
  // }

  private decodeToken(token:string):any{
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log("____TOKEN DECODE___", payload )
     return payload;
  }

  private isTokenExpired(token: string): boolean {
    try {
      // ✅ Obtener payload del JWT
      const payload = this.decodeToken(token);
      console.log("____isTokenExpired___", payload )
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
              role: user.role!
            }
          })
        )
  }

  login(email: string, password: string ): Observable<any> {
    // Enviamos la petición POST pasándole la URL y el cuerpo con las credenciales
    return this.http.post<LoginResponse>(this.apiAuth, {email,password}).pipe(
      // take(1) asegura que la petición se cierre sola en cuanto responda el servidor
      take(1),
      delay(1400),
      // tap() ejecuta lógica en segundo plano SIN modificar el flujo de datos original
      tap((respuesta: LoginResponse) => {
        if (respuesta && respuesta?.accessToken) { 

          this.updateUserAuth(
            {
              'id':   respuesta.user.id+"", 
              'name': respuesta.user.name, 
              'email':respuesta.user.email, 
              'role': this.getRole(respuesta.user.role!) 
            }
          );
          
          // ✅ SOLO el token se guarda manual
          localStorage.setItem('token', respuesta.accessToken);
          console.log('Sesión guardada en el servicio con éxito.', respuesta);

        }
      }),
      map(data => ({request:'ok'}
      )),
      catchError((error) => {
        console.log('Error de red detectado en el servicio:', error);
        if (error.status === 0){
            return throwError(() => new Error('❌ Problemas con la BD'));
        }
        return throwError(() => new Error('❌ '+error.error));
      })       
    );
  } 


  register(name:string, email: string, password: string): Observable<string> {
      const id = crypto.randomUUID();
      console.log("Registro user ok , ",id);
      return this.http.post<any>(this.apiRegister,  { name, email, password }).pipe(
        take(1),
        delay(1400),
        tap(user =>       
              this._state.update(state=>({
                ...state,
                currentUser : {
                  id: id,
                  name: name,
                  email: email,
                  password: password,
                  createdAt:new Date(),
                  role: UserRole.USER
                }
              })
         ),
         map(data=>({ data:'ok' })  )
    ));
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

  // hasPermission(permission: Permission): boolean {
  //   return this.user?.permissions?.includes(permission) ?? false;
  // }
  
}