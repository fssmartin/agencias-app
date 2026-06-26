import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaEs'
})
export class FechaEsPipe implements PipeTransform {

  transform(value: string | Date): string {

    if (!value) return '';

    const fecha = new Date(value);

    const texto = new Intl.DateTimeFormat('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute:'numeric'
    }).format(fecha);

    // Primera letra en mayúscula
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }
}