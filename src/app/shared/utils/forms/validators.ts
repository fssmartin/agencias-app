
import { Validators } from '@angular/forms';
import { CustomValidators, Patterns } from './patterns';

export const AppValidators = {
  
  email:    [ 
              Validators.required, 
              Validators.email
  ],  
  password: [
              // Validators.required, Validators.minLength(6), Validators.pattern(Patterns.password)]
                Validators.required,
                CustomValidators.minLength6,
                CustomValidators.hasUpperCase, 
                CustomValidators.hasNumber
  ],  
  name:     [
                Validators.required, 
                CustomValidators.hasUpperCase, 
                Validators.minLength(2), 
                Validators.maxLength(50), 
                // Validators.pattern(Patterns.name)
  ],

};
