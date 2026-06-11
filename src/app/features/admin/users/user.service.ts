import { computed, inject, Injectable, signal } from "@angular/core";
import { User, UserRole } from "../../../core/models/users.models";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, catchError, delay, filter, finalize, map, Observable, of, shareReplay, startWith, Subject, switchMap, take, tap, throwError } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserService {

  private api = 'http://localhost:3000/users';

 // constructor(private http: HttpClient) {}
  private http = inject(HttpClient);
  
  public userEmpty: User = {
    id: '', 
    name: '',
    password:'', 
    email: '', 
    isActive: true,  
    role: UserRole.USER, 
    permissions: [],
    createdAt: new Date() 
  };  

  constructor(){ 
  }

  private _loadingSignal = signal<boolean>(false);
  private _errorSignal   = signal<string | null>(null);

  loadingSignal = this._loadingSignal.asReadonly();
  errorSignal   = this._errorSignal.asReadonly();

  // // hace de base de datos
  // private myUsers: User[] = [
  //   { id: '1', name: 'Pedro Vila', password:'123', email: 'pedro.vila@example.com', isActive: true, role: UserRole.USER, createdAt: new Date() },
  //   { id: '2', name: 'Luis Garcia',password:'123',  email: 'luis.garcia@example.com', isActive: true, role: UserRole.ADMIN, createdAt: new Date() },
  //   { id: '3', name: 'Belen Perez',password:'123',  email: 'belen.perez@example.com', isActive: false, role: UserRole.MANAGER, createdAt: new Date() }
  // ];  

  getUsuarios():Observable<User[]> {

    this.clearSignals(true);
    
    return this.http.get<User[]>(this.api).pipe(
      catchError((error) => {
        console.error('Error de red detectado en el servicio:', error);
        if(error.status===404) 
            return throwError(() => new Error("❌ Mal la url, Not found"));
        return throwError(() => new Error('❌ '+error.message));
      }) 
    )
     
  }
  

  clearSignals(loading: boolean=false) {
    this._loadingSignal.set( loading );
    this._errorSignal.set(null);
  }

  // 🔄 trigger manual
  reload() { 
      console.log('RELOAD CALLED'); // 👈 añade esto
      //this.reload$.next(); 
  }
 

  deleteById(id: string): Observable<void> {
    
    this.clearSignals(true);

    return this.http.delete<void>(`${this.api}/${id}`).pipe(
      tap(() => this.reload()) ,
      catchError(err => {
         this._errorSignal.set('Error eliminando usuario'); 
         return throwError(() => err);  
      })
    );

    
  }
  

 getById(id: string): Observable<User> {

      //this.clearSignals(true);

      return this.http.get<User>(`${this.api}/${id}`).pipe(
        tap(user => {
          console.log('USER:', user);
        }),
        catchError(err => {
          if (err.status === 404)  
            return throwError(() => new Error("❌ Usuario no encontrado"));
          return throwError(() => new Error('❌ Error cargando usuario'));
        })
      );  
  }

  updateUser(user: User): Observable<User[]> {

   // this.clearSignals(true);

   
      return this.http.put<any>(`${this.api}/${user.id}`, user);
   
    

  }

  createUser(user: User): Observable<User> {
     this.clearSignals(true);

   //  let newUser:User =  this.userEmpty;
 
 //    return of(newUser)
     return this.http.post<User>(this.api, user).pipe(
      tap(() => this.reload()), 
      catchError(err => {
        this._loadingSignal.set(false);
        this._errorSignal.set('Error creando usuario');
        return throwError(() => err);
      })
    );


    // return of(newUser).pipe(
    //   delay(100),
    //   tap(() => {

    //     newUser = {
    //         ...user,
    //         id: Date.now().toString(), // o uuid si quieres
    //         createdAt: new Date()
    //     }; 
    //     this.myUsers = [...this.myUsers, newUser];
    //   }),
    //   tap(() => this.reload()), // dispara reload
    //   switchMap(() => this.users$.pipe(take(1))), // ✅ espera datos nuevos
    //   map(() => newUser),
    //   catchError(() => {
    //     this._loadingSignal.set( false );
    //     this._errorSignal.set( '❌ Error creando usuario' );        
    //     return throwError(() => new Error('Add failed'));
    //   })
    // );

  }  

}
