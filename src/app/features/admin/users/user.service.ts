import { Injectable } from "@angular/core";
import { User } from "./models/users.models";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserService {

  private api = '/api/users';

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.api);
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.api}/${id}`);
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.api, user);
  }

  update(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.api}/${id}`, user);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  
  // loadUsers() {
  //   this.userService.getAll().subscribe(users => {
  //     this.users = users;
  //   });
  // }

  // delete(id: number) {
  //   this.userService.delete(id).subscribe(() => {
  //     this.loadUsers();
  //   });
  // }


}
