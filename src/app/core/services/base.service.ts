import { throwError } from "rxjs";






// NO SE DEBERIA DE USAR !






export abstract class BaseService {

  protected handleError(operation: string) {
    return (error: any) => {
      console.error(`❌ Error en ${operation}:`, error);

      let message = error.status +  ', Error inesperado';

      switch (error.status) {
        case 400:
          message = error.error || error.message ||'es muy generico error... en login, user no existe, y en create correo existe ya';          
          break;
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
          message = error.error || error.message || 'Error desconocido';
      }

      message = "❌ " + message;

      return throwError(() => new Error(message));
    };
  }

  

}
