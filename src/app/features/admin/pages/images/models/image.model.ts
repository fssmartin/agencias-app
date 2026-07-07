

// listado
export interface BaseImage {
  id: string;
  url: string;
  desc:string
  isActive:boolean;
}


export interface Image extends BaseImage {
  name:string,
  width:number,
  height:number,
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ImageState  {
  data: BaseImage[];
  selectedImage: ActionImage | null;
  loading: boolean;
  error: boolean;
};

//  imageSelected --> show / update / 
// El partial hace que toodos sean opcionales
export type ActionImage = Partial<Image>;