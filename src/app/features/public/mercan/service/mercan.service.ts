import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { catchError, delay, Observable, switchMap, tap, throwError } from "rxjs";
import {  MercanResponse } from "../model/mercan.models";

@Injectable({ providedIn: 'root' })
export class MercanService {

  private baseUrl = 'https://openmercantil.es/api/v1/search?q=lidl&limit=2';
  
  private http = inject(HttpClient);
  
    constructor() { 
         console.log("___ MERCANT constructor") 
    }
    
    getData():Observable<MercanResponse> {
  
      return this.http.get<MercanResponse>(this.baseUrl).pipe(
         delay(1000), 
         tap((data) => {
            console.log('________________:', data);
         }),         
         catchError((error) => {
            console.error('Error en el servicio:', error.status, error);
           if(error.status===404) 
               return throwError(() => new Error("❌ Mal la url, Not found , 404"));
           return throwError(() => new Error('❌ '+error.message));
        }) 
       )   

    }     
}