export interface Agencia {
  id: number;
  nombre: string;
  direccion: string;
}


export interface NavLink {
  path: string;
  label: string;
}

export type NavbarMode = 'main' | 'section';