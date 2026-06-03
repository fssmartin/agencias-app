export interface NavLink {
  path: string;
  label: string;
  role : string | null;
}

export type NavbarMode = 'main' | 'section';
