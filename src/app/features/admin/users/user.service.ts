import { Injectable } from "@angular/core";
import { User, UserRole } from "../../../core/models/users.models";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, delay, Observable, of, switchMap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserService {

  private api = '/api/users';

  constructor(private http: HttpClient) {}

  public userEmpty: User = {
    id: '', 
    name: '', 
    email: '', 
    isActive: true,  
    role: UserRole.USER, 
    permissions: [],
    createdAt: new Date() 
  };  

  private usersSubject = new BehaviorSubject<User[]>([
    { id: '1', name: 'Pedro Vila', email: 'pedro.vila@example.com', isActive: true, role: UserRole.USER, createdAt: new Date() },
    { id: '2', name: 'Luis Garcia', email: 'luis.garcia@example.com', isActive: true, role: UserRole.ADMIN, createdAt: new Date() },
    { id: '3', name: 'Belen Perez', email: 'belen.perez@example.com', isActive: false, role: UserRole.MANAGER, createdAt: new Date() }
  ]);

  users$ = this.usersSubject.asObservable();

  private setUsers(users: User[]): void {
    this.usersSubject.next(users);
  }
  
  private get users(): User[] {
    return this.usersSubject.getValue();
  }


  getAll(): Observable<User[]> {

    // bueno con api
    // this.http.get<User[]>('/api/users')
    //   .subscribe(users => {
    //     this.setUsers(users);
    //   });

   
    // temporal sin http
    return this.users$.pipe(delay(400));
    
  }

  getById(id: string): Observable<User> {
    //return this.http.get<User>(`${this.api}/${id}`);
        
    // const user = this.users.find(u => u.id === id)!;
    // return of(user);

    // const current = this.usersSubject.getValue();
    // const index = current.findIndex(u => u.id === id);
    // if (index !== -1) {
    //   return of(current[index]).pipe(delay(1000));
    // }
    // return of(this.userEmpty).pipe(delay(1000));

    return this.users$.pipe(
      delay(400),
      switchMap(users => {
        const user = users.find(u => u.id === id);
        return of(user ? user : this.userEmpty);
      })
    );


  }

  create(user: User): Observable<User> {
    //return this.http.post<User>(this.api, user);  

    // return this.http.post<User>(this.api, user).pipe(
    //   tap(newUser => {
    //     // ✅ actualización inmediata
    //     this.setUsers([...this.users, newUser]);
    //   }),
    //   // 🔁 refresco opcional
    //   switchMap(() => this.http.get<User[]>(this.api)),
    //   tap(users => this.setUsers(users))
    // );



      const newUser = { 
        ...user,
        id: Math.random().toString(),
        createdAt: new Date()
      };

      this.setUsers([...this.users, newUser]);

      return of(newUser).pipe(delay(400));

  }

  update(user: User): Observable<User> {
   // return this.http.put<User>(`${this.api}/${id}`, user)

  //  const index= this.users.findIndex(u => u.id === user.id);
  //  if (index !== -1) {
  //     console.log("Actualizando usuario:", this.users[index]);
  //     this.users[index] = {
  //       ...this.users[index], // mantenemos los datos que no se actualizan
  //       ...user, // todos los q tengan que actualizarse
  //       updatedAt: new Date(),
  //       id: user.id // aseguramos que no se pierde
  //     };
  //   }
  //   return of(this.users[index]).pipe(delay(1000));

    // siempre se crea un nuevo array para que detecte el cambio, 
    // y se actualiza solo el que cambia
    const updated = this.users.map(u =>
        u.id === user.id
          ? { 
              ...u,           // ✅ mantiene lo anterior
              ...user,        // ✅ sobrescribe cambios
              updatedAt: new Date() // ✅ añade timestamp
            }
          : u
    );

    this.setUsers(updated);
    return of(user).pipe(delay(400));

  }

  delete(id: string): Observable<void> {
    //return this.http.delete<void>(`${this.api}/${id}`);
    
    // this.users = this.users.filter(u => u.id !== id);
    // return of(void 0).pipe(delay(1000));

    
    const current = this.users;
    const filtered = current.filter(u => u.id !== id);
    this.setUsers(filtered);
    return  of(void 0).pipe(delay(400));
  }

  
  refresh(): void {
    this.http.get<User[]>(this.api)
      .subscribe(users => this.setUsers(users));
  }

 

}
