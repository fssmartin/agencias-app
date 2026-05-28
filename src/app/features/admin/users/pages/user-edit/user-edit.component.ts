import { Component, Input } from '@angular/core'; 
import { FormBuilder, FormGroup } from '@angular/forms';
import { User, UserRole } from '../../models/users.models';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../user.service';

import { UserFormComponent } from "../user-form/user-form.component";


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
    // private userService: UserService
  ) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id') || '';

      this.user = { id: '1', name: 'Pedro Vila', email: 'pedro.vila@example.com', isActive: true, role: UserRole.USER, createdAt: new Date() };

      // this.userService.getById(id).subscribe(user => {
      //   this.user = user;
      //   // los dos son iguales , pero patch mete en el form los que vengan 
      //   // y set mete todos y si no vienen los borra, por eso es mejor patch
      //   //this.form.patchValue(user);
      //   //this.form.setchValue(user);        
      // });
    });
  }
 

  onSave(updatedUser: User) {
    // this.userService.update(this.user.id, updatedUser)
    //   .subscribe(() => {
    //     // navegación o mensaje
    //   });
  }


    
    
}