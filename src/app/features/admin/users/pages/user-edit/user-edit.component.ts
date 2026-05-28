import { Component, Input } from '@angular/core'; 
import { FormBuilder, FormGroup } from '@angular/forms';
import { User, UserRole } from '../../models/users.models';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user.service';

import { UserFormComponent } from "../user-form/user-form.component";
import { map, switchMap } from 'rxjs';


@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, UserFormComponent],

  template: `
    <PRE>id USER: {{ id }}</PRE>

    <app-user-form
      *ngIf="user"
      [user]="user"
      (save)="onSave($event)">
    </app-user-form>
  `

})
export class UserEditComponent {

  id!:string
  user!: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {

    this.route.paramMap.pipe(
      map(params => params.get('id') || ''),
      switchMap(id => this.userService.getById(id))
    ).subscribe(user => {
      this.user = user;
    });

  }
 
  onSave(updatedUser: User) {
     this.userService.update(updatedUser)
       .subscribe(() => {
          //volver a la lista o mostrar mensaje
          this.router.navigate(['/admin/users']);          
       });
  }


    
    
}