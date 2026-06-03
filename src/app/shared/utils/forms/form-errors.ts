
import { AbstractControl } from '@angular/forms';

export function getErrorMessage(control: AbstractControl | null): string {
  if (!control || !control.errors || !control.touched) return '';

  if (control.errors['required']) return 'Campo obligatorio';
  if (control.errors['email']) return 'Email inválido';

  if (control.errors['minlength']) {
    return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
  }

  if (control.errors['pattern']) {
    return 'Formato incorrecto';
  }

  return ' Campo inválido';
}
