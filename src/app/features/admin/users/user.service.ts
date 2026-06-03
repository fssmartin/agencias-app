import { inject, Injectable } from "@angular/core";
import { User, UserRole } from "../../../core/models/users.models";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, catchError, delay, filter, finalize, map, Observable, of, shareReplay, startWith, Subject, switchMap, take, tap, throwError } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserService {

  private api = '/api/users';

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

  private loadingSubject = new BehaviorSubject<boolean>(false)
  private errorSubject = new BehaviorSubject<string | null>(null);

  // 🔁 Trigger para recargar datos
  private reload$ = new BehaviorSubject<void>(undefined);

  error$ = this.errorSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();

  private myUsers: User[] = [
    { id: '1', name: 'Pedro Vila', password:'123', email: 'pedro.vila@example.com', isActive: true, role: UserRole.USER, createdAt: new Date() },
    { id: '2', name: 'Luis Garcia',password:'123',  email: 'luis.garcia@example.com', isActive: true, role: UserRole.ADMIN, createdAt: new Date() },
    { id: '3', name: 'Belen Perez',password:'123',  email: 'belen.perez@example.com', isActive: false, role: UserRole.MANAGER, createdAt: new Date() }
  ]; 
  
 
  users$ = this.reload$.pipe(
    startWith(void 0),
    delay(0),
    switchMap(() =>{
      this.loadingSubject.next(true);
      return of(this.myUsers).pipe(
        delay(500),
        map(users => users ?? []),
        tap(() => { 
          this.loadingSubject.next(false);
        }),
        catchError(() => {
          this.loadingSubject.next(false);
          this.errorSubject.next('Error cargando usuarios');
          return of([]);
        })
      )
    }),
    shareReplay(0)
  );

  clearObservable(loading: boolean=false) {
    this.loadingSubject.next(loading);
    this.errorSubject.next(null); 
  }

  // 🔄 trigger manual
  reload() { 
      console.log('RELOAD CALLED'); // 👈 añade esto
      this.reload$.next(); 
  }
 

  deleteById(id: string): Observable<void> {
    
    // return this.http.delete<void>(`${this.api}/${id}`).pipe(
      // tap(() => {
      //   this.loadingSubject.next(true); 
      //   this.errorSubject.next(''); // Limpia errores previos
      // }),
    //   tap(() => this.reload()) 
    //   catchError(err => {
    //      this.errorSubject.next('Error eliminando usuario'); 
    //      return throwError(() => err);  
    //   })
    // );

    return of(void 0).pipe(
      tap(() => {
    this.clearObservable(true);

      }),
      delay(300),
      tap(() => {
        //throw new Error('xxxxxxxxxxxxxxxx');
        this.myUsers = this.myUsers.filter(u => u.id !== id);
        this.reload();
      }),
      catchError(err => {
        // ✅ aquí actualizas el estado global de error
        this.loadingSubject.next(false); 
        this.errorSubject.next('❌ Error eliminando usuario');
        // ✅ y decides si propagas o no
        return throwError(() => err);
      })

    );
  }

 getById(id: string): Observable<User | undefined> {

      this.clearObservable(true);

      // return this.http.get<User>(`${this.api}/${id}`).pipe(
      //   tap(user => {
      //     console.log('USER:', user);
      //     this.loadingSubject.next(false);
      //   }),
      //   catchError(err => {
      //     this.loadingSubject.next(false);

      //     if (err.status === 404) {
      //       this.errorSubject.next('Usuario no encontrado');
      //     } else {
      //       this.errorSubject.next('Error cargando usuario');
      //     }

      //     return of(null); // ✅ en vez de error, devuelves null para que el flujo siga
      //   })
      // );

      return this.users$.pipe(
        delay(300),
        filter(users => users.length > 0),
        map(users => users.find(u => u.id === id)  ) ,
        tap((user) => {
          this.loadingSubject.next(false); 
          if(!user) this.errorSubject.next('error, usuario no encontrado'); 
        }),
        take(1) // ✅ solo lo necesitas una vez
      )

  }

  updateUser(user: User): Observable<User[]> {

    this.clearObservable(true);

    return of([]).pipe(
      delay(100),
      tap(() => {
          //      throw new Error('xxxxxxxxxxxxxxxx');
        user.updatedAt = new Date();
        this.myUsers = this.myUsers.map(u =>
          u.id === user.id ? { ...u, ...user } : u
        );
      }),
      
      tap(() => this.reload()), // dispara reload
      switchMap(() => this.users$.pipe(take(1))), // ✅ espera datos nuevos
      map(() => []),
      catchError(() => {
        this.loadingSubject.next(false);
        this.errorSubject.next('❌ Error actualizando usuario');
        return throwError(() => new Error('Update failed'));
      })
    );

  }

  createUser(user: User): Observable<User> {
     this.clearObservable(true);

    // return this.http.post<User>(this.api, user).pipe(
    //   tap(() => this.reload()), 
    //   catchError(err => {
    //     this.loadingSubject.next(false);
    //     this.errorSubject.next('Error creando usuario');
    //     return throwError(() => err);
    //   })
    // );

    let newUser:User =  this.userEmpty;

    return of(newUser).pipe(
      delay(100),
      tap(() => {

        newUser = {
            ...user,
            id: Date.now().toString(), // o uuid si quieres
            createdAt: new Date()
        }; 
        this.myUsers = [...this.myUsers, newUser];
      }),
      tap(() => this.reload()), // dispara reload
      switchMap(() => this.users$.pipe(take(1))), // ✅ espera datos nuevos
      map(() => newUser),
      catchError(() => {
        this.loadingSubject.next(false);
        this.errorSubject.next('❌ Error creando usuario');
        return throwError(() => new Error('Add failed'));
      })
    );

  }  

}
