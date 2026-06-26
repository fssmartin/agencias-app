
export interface MercanState  {
  data?: MercanResponse | null;
  loading: boolean;
  error: boolean;
};

export interface MercanResponse {
  descripcion: string;
  estado: number;
  datos: string;  
  metadatos: string;
  
  query: string;
  count: number;
  offset: number;
  items: SubMercan[];
  _attributions: any
}

export interface SubMercan {
      slug: string,
      name: string,
      cif: string,
      acts_count: number,
      last_seen: string,
      aliases: string[]
}