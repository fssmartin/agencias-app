import { computed, DestroyRef, inject, Injectable, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { catchError, map, Observable, pipe, tap, throwError } from "rxjs";
import { AuthService } from "./auth.service";
import { AuthStateModel, AuthUser, AuthUserFull } from "./models/auth.model";
import { UserRole } from "../admin/pages/users/models/user.model";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
 

@Injectable({ providedIn: 'root' })
export class AuthStore {

  private destroyRef = inject(DestroyRef);

  private _state = signal<AuthStateModel>({
    currentUser:null,
    loading: false,
    error: null
  })

  state = this._state.asReadonly();

  currentUser      = computed( ()=> this.state().currentUser );
  isAdmin          = computed(() => this.state().currentUser?.role === UserRole.ADMIN);  
  isLogged         = computed(() => this.state().currentUser !== null); // --> ES LO MISMO  !!this.currentUser());
  countNotified    = computed(() => this.state().currentUser ? 12 : 0); 


  // NOTA :
  //   --- EL STORE bien que llame a la api
  //   --- pero la navegaciones mejor en el componente.  this.router.navigate(['/home']);
  //   -- con lo cual devolvemos el observable al componente.
  //   -- takeUntilDestroyed(this.destroyRef)  con el subscribe
  //   -- llamo desde el constructor al servicio para toda la logica del recarga del usuario y
  //      actaulizar signal desde el store NO desde el servicio como lo tenia antes.

  // store PIDE datos y actualiza signals
 
  constructor(private authService:AuthService,private router:Router ){
    console.log("_____ AUTH STORE --- INIT constructor --- restoreSession")
    this.restoreSession();
  }
  
  private restoreSession(){

      this.authService.initFromStorage()
          .pipe(
              takeUntilDestroyed(this.destroyRef)        
          )   
          .subscribe({
            next: user => this.setUser(user,false,null),
            error: (error: HttpErrorResponse) => {
//             if (error.status === 404) {
               console.log("------- ❌",error.error.message ? error.error.message : `[${error.status}]  ${error.message}` )
               this.logout();
            }
          });

  }

  public login(email:string, password:string) {
      
    this.setUser(null, true, null);

    this.authService.login(email, password.trim()).pipe(
        takeUntilDestroyed(this.destroyRef),
        map(data => ({ data, loading: false, error: null })),
        tap((request) => ( 
          this.setUser(request.data, false, null ) 
        ))
      )
      .subscribe({
          next: (request) => {
            console.log('🆗 ¡Login correcto!', request.data);               
            this.router.navigate(['/home']);
          },
          error: (err) => {
            if(err.status=400){
              this.setUser(null, false, 'Usuario o contraseña incorrectos' ) 
            }
          }
      });
  }
  
  setUser(user: AuthUserFull|null, loading:boolean, error:string|null) {
      this._state.update(s => ({ ...s, currentUser: user, loading:loading, error:error }));
  }

  logout() {
      this._state.set({  currentUser: null, loading: false, error: null   });                
      this.authService.logout();
  } 

}