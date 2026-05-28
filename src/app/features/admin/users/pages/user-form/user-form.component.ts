import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core'; 
import { User } from '../../models/users.models';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
 
@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule ,ReactiveFormsModule],
  template: `

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
      </select>
    </label>
  </div>

  <button type="submit" [disabled]="form.invalid">Guardar</button>

</form>

<PRE>{{this.user | json}}</PRE>

  `
})
export class UserFormComponent {
    @Input() user: User | null = null;
    @Output() save = new EventEmitter<User>();
    form!: FormGroup;
    
    constructor(private fb: FormBuilder) {}
    
    ngOnInit(): void {
        this.form = this.fb.group({
            name: [this.user?.name || ''],
            email: [this.user?.email || ''],
            role: [this.user?.role || ''],
            isActive: [this.user?.isActive || false],
            createdAt: [this.user?.createdAt || new Date()]
        });
    }
    
    get value(): User {
        return this.form.value;
    }
    
    submit() {
        this.save.emit(this.value);
        throw new Error('Method not implemented.');
    }  
    
    
}