import { imageApiDto, ImageDto } from '../../../../../core/dto/image.dto';
import { BaseImage, Image } from '../models/image.model'; 

export class ImageMapper {


  // DTO -> MODEL
  static toSelect(dto: ImageDto): Image {
   // console.log("____MAPPER toSelect", dto)
    return {
        id: dto.id,
        desc: dto.description,
        url: dto.url_image,
        isActive: dto.is_active,
        createdAt: dto.created_at ? new Date(dto.created_at) : undefined,
        updatedAt: dto.updated_at ? new Date(dto.updated_at) : undefined,
    };
  }

 
  static toDomain(dto: imageApiDto): BaseImage {
    return {
      id: dto.id,
      url: dto.url_image,
      isActive: dto.is_active,
      desc:dto.description
    };
  }


}