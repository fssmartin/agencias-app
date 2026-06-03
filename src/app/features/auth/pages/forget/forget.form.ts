
import { FormBuilder } from '@angular/forms';
import { AppValidators } from '../../../../shared/utils/forms/validators';

export const createForgetForm = (fb: FormBuilder) => {
  return fb.group({
    email:    ['',AppValidators.email],
  });
}; 