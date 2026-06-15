
import { AbstractControl } from '@angular/forms';

export function getErrorMessage(control: AbstractControl | null): string[] {

  const messages: string[] = [];

  if (!control || !control.errors || !control.touched) return [];

  if (control.errors['required']) 
    messages.push('El campo es obligatorio');
  
  if (control.errors['email']) 
    messages.push('El email es invalido');

  
  if (control.errors['minlength']) 
    messages.push(`Mínimo ${control.errors['minlength'].requiredLength} caracteres`);
  
  if (control.errors['maxlength']) 
    messages.push(`Máximo ${control.errors['maxlength'].requiredLength} caracteres`);
  
  if (control.errors['hasUpperCase']) 
    messages.push('Debe contener una mayúscula');
  
  if (control.errors['hasNumber']) 
    messages.push('Debe contener un número');
  
  // if (control.errors['pattern']) 
  //     messages.push('Campo Invalido..');

  return messages;
}
