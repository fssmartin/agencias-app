import { Injectable } from "@angular/core";
// import { question } from "./models/questions.models";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class QuestionService {

  private api = '/api/questions';

  constructor(private http: HttpClient) {}

  // getAll(): Observable<Question[]> {
  //   return this.http.get<Question[]>(this.api);
  // }

  // getById(id: number): Observable<Question> {
  //   return this.http.get<Question>(`${this.api}/${id}`);
  // }

  // create(question: Question): Observable<Question> {
  //   return this.http.post<Question>(this.api, question);
  // }

  // update(id: number, question: Question): Observable<Question> {
  //   return this.http.put<Question>(`${this.api}/${id}`, question);
  // }

  // delete(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.api}/${id}`);
  // }

  // no

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
