import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { RolesService } from '../roles.service';

export const rolesResolver: ResolveFn<string[]> = () => {
  return inject(RolesService).getRoles();
};