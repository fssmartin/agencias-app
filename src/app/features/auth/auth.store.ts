import { computed, DestroyRef, inject, Injectable, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { map, pipe } from "rxjs";
import { AuthService } from "./auth.service";
import { AuthStateModel, AuthUser, AuthUserFull } from "./models/auth.model";
import { UserRole } from "../admin/pages/users/models/user.model";
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


  constructor(
    private router:Router,
    private authService:AuthService
  ){ }
 
  public login(email:string, password:string) {
      
      this.setUser(null, true, null);    

      this.authService.login(email, password.trim()).pipe(
          map(data => ({ data, loading: false, error: null }))
        )
        .pipe(takeUntilDestroyed(this.destroyRef)) 
        .subscribe({
             next: (request) => {
               console.log('¡Login correcto!', request.data);
               this.setUser(request.data, false, null);    
               
                this.router.navigate(['/home']);
             },
             error: (err) => {
                console.log("___________________________error___ component al logarse !!",err)
                this._state.set({currentUser: null,loading: false, error: err.error   });                
             }
         });
    }
    
    setUser(user: AuthUserFull|null, loading:boolean, error:string|null) {
        this._state.update(s => ({ ...s, currentUser: user, loading:loading, error:error }));
    }

      logout() {
            this._state.set({currentUser: null,loading: false, error: null   });                
            this.authService.logout();
        }

 

}