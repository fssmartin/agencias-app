
import {FormBuilder } from '@angular/forms';
import { AppValidators } from '../../../../../shared/utils/forms/validators';
import { User } from '../../../../../core/models/users.models';

export const createUserForm = (fb: FormBuilder,user: User) => {
  return fb.group({
    id:       [user.id],
    name:     [user.name,AppValidators.name],
    email:    [user.email,AppValidators.email],
    isActive: [user.isActive],
    role:     [user.role],
    permissions: [user.permissions]
  });
};