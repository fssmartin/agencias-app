
import { FormBuilder, Validators } from '@angular/forms';

export const createLoginForm = (fb: FormBuilder) => {
  return fb.group({
    email: [
      '',
      [Validators.required, Validators.email]
    ],
    password: [
      '',
      [Validators.required, Validators.minLength(6)]
    ]
  });
};
