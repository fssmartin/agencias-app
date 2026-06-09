import { computed, Injectable,   signal } from "@angular/core";
import { AuthState, AuthStateModel, User, UserRole } from "../../core/models/users.models";

@Injectable({ providedIn: 'root' })
export class AuthService implements AuthState {


  private _state = signal<AuthStateModel>({
    currentUser:null
  })

  state = this._state.asReadonly();

  currentUser   = computed( ()=> this.state().currentUser );
  isAdmin       = computed(() => this.state().currentUser?.role === UserRole.ADMIN);  
  isLogged      = computed(() => this.state().currentUser !== null); // --> ES LO MISMO  !!this.currentUser());
  countNotified = computed(() => this.state().currentUser ? 12 : 0); 
  iconByRole  = computed(() => {
       const user = this.state().currentUser;
       return user ? this.getIconRole(user.role) : '👤'
  });

  getIconRole(role:string){
    switch (role) {
      case UserRole.ADMIN:return '🛡️';
      case UserRole.MANAGER:return '📊';
      default:return '👤';
    }
  }

  login(email: string, password: string): boolean { 
      this._state.update(state=> ({
          ...state, 
          currentUser:{
            id:'2', 
            name:'Luis pepe', 
            email:'asd@asd.es', 
            role:UserRole.ADMIN
          }
        })
      ) 
      
      return true;  
  }

  updateUserAuth(user:User){
      this._state.update(state=> ({
          ...state, 
          currentUser:{
            id:user.id, 
            name:user.name, 
            email:user.email, 
            role:user.role!
          }
        })
      )
  }

  register(name:string, email: string, password: string): boolean {
      const id = crypto.randomUUID();
      console.log("Registro user ok , ",id);

      // return this.http.post<User>('/api/register', { name, email, password }).pipe(
      //   tap(user => this.currentUser.set(user)) // ✅ autologin aquí
      // );
      
      this._state.update(state=>({
          ...state,
          currentUser : {
            id: id,
            name: name,
            email: email,
            role: UserRole.USER
        }
      }))

      return true;
  }

  logout() {
      this._state.update(state=> ({
          ...state, 
          currentUser:null
        }));
  }
  
  
  // hasPermission(permission: Permission): boolean {
  //   return this.user?.permissions?.includes(permission) ?? false;
  // }
  
}