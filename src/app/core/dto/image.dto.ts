// lo que me viene del back y como tengo que enviarlo.
 

// getbyid 
export interface ImageDto {
  id: string;

  description: string;
  url_image: string;
  name_image:string;

  is_active: boolean;

  width:number;
  height:number;

  created_at?: Date;
  updated_at?: Date;
}


// listado getAll
export interface imageApiDto {
  id: string;
  url_image: string;
  is_active: boolean;
  description:string
}