
import { FormBuilder } from '@angular/forms';
import { AppValidators } from '../../../../shared/utils/forms/validators';

export const createRegisterForm = (fb: FormBuilder) => {
  return fb.group({
    name:     ['',AppValidators.name],
    email:    ['',AppValidators.email],
    password: ['',AppValidators.password]
  });
}; 