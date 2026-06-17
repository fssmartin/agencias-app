import { throwError } from "rxjs";

export abstract class BaseService {

  protected handleError(operation: string) {
    return (error: any) => {
      console.error(`❌ Error en ${operation}:`, error);

      let message = 'Error inesperado';

      switch (error.status) {
        case 404:
          message = 'Recurso no encontrado';
          break;
        case 500:
          message = 'Error interno del servidor';
          break;
        case 0:
          message = 'Sin conexión';
          break;
        default:
          message = error.message || 'Error desconocido';
      }

      message = "❌ " + message;

      return throwError(() => new Error(message));
    };
  }

  

}
