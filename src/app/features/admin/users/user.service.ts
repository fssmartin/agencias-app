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

  // // hace de base de datos
  // private myUsers: User[] = [
  //   { id: '1', name: 'Pedro Vila', password:'123', email: 'pedro.vila@example.com', isActive: true, role: UserRole.USER, createdAt: new Date() },
  //   { id: '2', name: 'Luis Garcia',password:'123',  email: 'luis.garcia@example.com', isActive: true, role: UserRole.ADMIN, createdAt: new Date() },
  //   { id: '3', name: 'Belen Perez',password:'123',  email: 'belen.perez@example.com', isActive: false, role: UserRole.MANAGER, createdAt: new Date() }
  // ];  

  getUsuarios():Observable<User[]> {
  
    return this.http.get<User[]>(this.api).pipe(
      delay(1000),
      catchError((error) => {
        console.error('Error en el servicio:', error.status, error);
        if(error.status===404) 
            return throwError(() => new Error("❌ Mal la url, Not found , 404"));
        return throwError(() => new Error('❌ '+error.message));
      }) 
    )   

  }

  deleteById(id: string): Observable<void> {    
    
    return this.http.delete<void>(`${this.api}/${id}`).pipe(
      delay(1000),
      catchError(err => {
         return throwError(() => err);  
      })
    );  

  }

  getById(id: string): Observable<User> {

    return this.http.get<User>(`${this.api}/${id}`).pipe(
      delay(1000),
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

  updateUser(user: User): Observable<User> {

    return this.http.put<any>(`${this.api}/${user.id}`, user).pipe(
      delay(1000),
      tap(user => {
        console.log('USER modified service',user);
      }),
      catchError(err => {
        if (err.status === 404)  
          return throwError(() => new Error("❌ Usuario no encontrado"));
        return throwError(() => new Error('❌ Error modificando usuario'));
      })
    );  

  }

  createUser(user: User): Observable<User> {

     return this.http.post<User>(this.api, user).pipe(
      delay(1000),
      // map((response: User) => {
      //   if (!response.id) {
      //     throw new Error('Usuario no creado correctamente');
      //   }
      //   return response;
      // }),

      catchError(err => {
        console.log("Error creando ususario", err.message)
        return throwError(() => err);
      })
    );

  }  

}
