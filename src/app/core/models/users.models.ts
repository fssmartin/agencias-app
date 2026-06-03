
export interface User {
  id?: string;

  // datos básicos
  name: string;
  email: string;

  // estado
  isActive: boolean;

  // roles / permisos
  role?: UserRole;
  permissions?: Permission[];  
  
  // auditoría
  readonly createdAt?: Date; // 🔒 no se debe cambiar
  updatedAt?: Date;          // ✏️ se añade en updates

  // opcional
  lastLogin?: Date;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  MANAGER = 'MANAGER'
}


export enum Permission {
  USERS_READ = 'users.read',
  USERS_CREATE = 'users.create',
  USERS_DELETE = 'users.delete'
}

