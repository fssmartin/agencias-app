import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core'; 
import { User } from '../../models/users.models';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../user.service';
 
@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule ,ReactiveFormsModule],
  template: `
<h4>
  {{ user?.id ? 'Editar Usuario' : 'Crear Usuario' }}
</h4>

<form [formGroup]="form" (ngSubmit)="submit()">

  <div class="container">
    <label><span>Activo</span>
      <input type="checkbox" formControlName="isActive" />
    </label>
  </div>

  <div>
    <label><span>Nombre</span>
      <input type="text" formControlName="name" />
    </label>
  </div>

  <div>
    <label><span>Email</span>
      <input type="email" formControlName="email" />
    </label>
  </div>

  <div>
    <label><span>Rol</span>
      <select formControlName="role">
        <option value="">Selecciona un rol</option>
        <option value="ADMIN">Admin</option>
        <option value="USER">User</option>
        <option value="MANAGER">Manager</option>
      </select>
    </label>
  </div>

  <button type="submit" [disabled]="form.invalid">    
    {{ user?.id ? 'Modificar' : 'Guardar' }}
  </button>

</form>

  <PRE>{{this.user | json}}</PRE>

`
})
export class UserFormComponent {
    @Input() user?: User;
    @Output() save = new EventEmitter<User>();
    form!: FormGroup;
    
    constructor(private fb: FormBuilder,private userService: UserService) {}
    
    ngOnInit(): void {

        const userData = this.user || this.userService.userEmpty;

        this.form = this.createUserForm(userData); // Inicializa el formulario con los valores del usuario vacío
    
        this.form.patchValue(userData); 
        // Si se proporciona un usuario, actualiza el formulario con sus valores, 
        // de lo contrario, usa el usuario vacío
         // los dos son iguales , pero patch mete en el form los que vengan 
         // y set mete todos y si no vienen los borra, por eso es mejor patch
         //this.form.patchValue(userData);
         //this.form.setchValue(userData);    
    }
    
    createUserForm(user: User) {
      return this.fb.group({
        id: [user.id],
        name: [user.name],
        email: [user.email],
        isActive: [user.isActive],
        role: [user.role],
        permissions: [user.permissions]
      });
    }

    
    get value(): User {
        return this.form.value;
    }
    
    submit() {
        console.log("submit",this.value)
        this.save.emit(this.value);
        //throw new Error('Method not implemented.');
    }  
    
    
}