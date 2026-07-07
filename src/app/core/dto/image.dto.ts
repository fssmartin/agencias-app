// lo que me viene del back y como tengo que enviarlo.
 

export interface ImageDto {
  id: string;

  description: string;
  url_image: string;

  is_active: boolean;

  created_at?: string;
  updated_at?: string;
}


export interface imageApiDto {
  id: string;
  url_image: string;
  is_active: boolean;
  description:string
}