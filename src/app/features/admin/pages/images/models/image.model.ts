
export interface BaseImage {
  id: string;
  url: string;
  desc:string
  isActive:boolean;
}

export interface Image extends BaseImage {
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ApiImage {
  image: BaseImage
}


