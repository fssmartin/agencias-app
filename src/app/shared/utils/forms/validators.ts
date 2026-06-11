
import { Validators } from '@angular/forms';
import { Patterns } from './patterns';

export const AppValidators = {
  email:    [Validators.required, Validators.pattern(Patterns.email)],
  password: [Validators.required, Validators.minLength(6), Validators.pattern(Patterns.password)],
  required: [Validators.required],
  name:     [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(Patterns.name)],
};
