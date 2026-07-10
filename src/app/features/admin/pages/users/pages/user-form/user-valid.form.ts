
import {FormBuilder } from '@angular/forms';
import { AppValidators } from '../../../../../../shared/utils/forms/validators';
import { ActionUser } from '../../models/user.model';
import { BaseImage } from '../../../images/models/image.model';

export const createUserForm = (fb: FormBuilder,user: ActionUser) => {
  if(user.id){
    // update SIN password
    return fb.group({
      id:        [user.id],
      username:  [user.username , AppValidators.name],
      firstname: [user.firstname , AppValidators.name],
      lastname:  [user.lastname , AppValidators.name],
      email:     [user.email, AppValidators.email],
      isActive:  [user.isActive],
      role:      [user.role],
      images:    fb.control<BaseImage[]>([])
      //permissions: [user.permissions]
      //permissions: [user.permissions || []]
    });
  }else{
    return fb.group({
      id:        [user.id],
      username:  [user.username , AppValidators.name],
      firstname: [user.firstname , AppValidators.name],
      lastname:  [user.lastname , AppValidators.name],
      email:     [user.email, AppValidators.email],
      isActive:  [user.isActive],
      role:      [user.role],
      password:  [ '' , AppValidators.password],
      images:    [[]]
    });
  }
};