
export interface Question {
  id: string;

  // datos básicos
  descripcion: string;

  // estado
  isActive: boolean;
  
  // auditoría
  createdAt: Date;
  updatedAt?: Date;
}
