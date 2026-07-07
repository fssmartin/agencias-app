import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ImageDto } from "../../../../core/dto/image.dto";
import { catchError, delay, map, Observable, tap } from "rxjs";
import { ImageMapper } from "./mappers/image.mapper";
import { Image } from "./models/image.model";


@Injectable({ providedIn: 'root' })
export class ImageService {

  private api = 'http://localhost:3000/images';

  constructor(private http: HttpClient) {}  

  // solo para listado....
  getImages() {

  }

  getById(id:string):Observable<Image> {   
        return this.http.get<ImageDto>(`${this.api}/${id}`).pipe(
          delay(1000),
          tap(image => {
            console.log('IMAGE:', image);
          }),
          map(x  => ImageMapper.toSelect(x)), 
            
          catchError(this.handleError('getById'))
  
        );
  }

  handleError(arg0: string): any {
    throw new Error("Method not implemented.");
  }

  deleteById() {        
  }

  updateImage() {
  }

  createImage() {
  }  


  

}
