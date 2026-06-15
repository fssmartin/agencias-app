import { AbstractControl, ValidationErrors } from '@angular/forms';
    
export const Patterns = {
  
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
  // password: /^(?=.*[A-Z])(?=.*\d).{6,}$/,
  phone: /^[0-9]{9}$/,
  dni: /^[0-9]{8}[A-Z]$/,
  onlyLetters: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
  // name: /^[A-Za-zÁÉÍÓÚáéíóúñÑ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúñÑ]+)*$/   
};


export const CustomValidators = {

  hasUpperCase(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    return /[A-Z]/.test(control.value)
      ? null
      : { hasUpperCase: true };
  },

  hasNumber(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    return /[0-9]/.test(control.value)
      ? null
      : { hasNumber: true };
  },

  minLength6(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    return control.value.length >= 6
      ? null
      : { minlength: { requiredLength: 6 } };
  }

};
