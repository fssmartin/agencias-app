
import { FormBuilder } from '@angular/forms';
import { AppValidators } from '../../../../shared/utils/forms/validators';

export const createLoginForm = (fb: FormBuilder) => {
  return fb.group({
    email:    ['',AppValidators.email],
    password: ['',AppValidators.password]
  });
}; 