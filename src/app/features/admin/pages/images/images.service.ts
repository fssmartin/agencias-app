import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ImageDto } from "../../../../core/dto/image.dto";
import { catchError, delay, map, Observable, of, tap } from "rxjs";
import { ImageMapper } from "./mappers/image.mapper";
import {  BaseImage, Image } from "./models/image.model";
import { BaseService } from "../../../../core/services/base.service";


@Injectable({ providedIn: 'root' })
export class ImageService  extends BaseService{

  private api = 'http://localhost:3000/images';

 // constructor(private http: HttpClient) {}
  private http = inject(HttpClient);

    private images: ImageDto[] = [
      { id: "1", description:"pepe",  url_image:'http://localhost:3001/uploads/avatar1.jpg', is_active:false, width:100, height:100, name_image:'avatar1.jpg', created_at:new Date()},
      { id: "2", description:"ssss",  url_image:'http://localhost:3001/uploads/avatar2.jpg', is_active:true , width:100, height:100, name_image:'avatar2.jpg', created_at:new Date()},
      { id: "3", description:"asdf",  url_image:'http://localhost:3001/uploads/avatar3.jpg', is_active:true , width:100, height:100, name_image:'avatar3.jpg', created_at:new Date()},
      { id: "4", description:"dsaa",  url_image:'http://localhost:3001/uploads/avatar4.jpg', is_active:true , width:100, height:100, name_image:'avatar4.jpg', created_at:new Date()},
      { id: "5", description:"ffff",  url_image:'http://localhost:3001/uploads/avatar5.jpg', is_active:true , width:100, height:100, name_image:'avatar5.jpg', created_at:new Date()},
      { id: "6", description:"wwww",  url_image:'http://localhost:3001/uploads/avatar6.jpg', is_active:true , width:100, height:100, name_image:'avatar6.jpg', created_at:new Date()},
      { id: "7", description:"cccc",  url_image:'http://localhost:3001/uploads/avatar7.jpg', is_active:true , width:100, height:100, name_image:'avatar7.jpg', created_at:new Date()},
      { id: "8", description:"xxxx",  url_image:'http://localhost:3001/uploads/avatar8.jpg', is_active:true , width:100, height:100, name_image:'avatar8.jpg', created_at:new Date()},
      { id: "9", description:"hhhh",  url_image:'http://localhost:3001/uploads/avatar9.jpg', is_active:true , width:100, height:100, name_image:'avatar9.jpg', created_at:new Date()},
    ];


  // solo para listado....
  getImages():Observable<BaseImage[]> {

      console.log("________________________________________ entro...")

    return this.http.get<ImageDto[]>(this.api).pipe(
              delay(1000),   
              tap(request => {
                console.log('IMAGE:', request);
              }),
              // USANDO UN MAPPER !
              map((data) =>
                data.map(dto => ImageMapper.toDomain(dto))
              ),
              catchError(this.handleError('getImages'))  // es comun para toda la aplicacion
            )


  }
 

  // handleError(arg0: string): any {
  //   throw new Error("Method not implemented.");
  // }

 

  

}
