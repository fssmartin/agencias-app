import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core'; 
import { User, UserRole } from '../../../../../core/models/users.models';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../user.service';

import { createUserForm } from '../user-form/user-valid.form';
import { getErrorMessage } from '../../../../../shared/utils/forms/form-errors';


@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule ,ReactiveFormsModule],
  template: ` 

      <h4>
          {{ user?.id ?  mode === 'view' ? 'Consulta Usuario' :  'Editar Usuario' : 'Crear Usuario' }}
      </h4>
      
      <form [formGroup]="form" (ngSubmit)="submit()" autocomplete="off" 
            [ngClass]="{
              'form form-view': mode === 'view',
              'form form-edit': mode === 'edit'
              }"
      >

        <ng-container *ngIf="mode === 'edit' || mode=== 'create'" >

            <div>
              <label><span>Activo</span>
                <input type="checkbox" formControlName="isActive" />
              </label> 
            </div>
    
            <div>
              <label>
                <span>Nombre</span>
                <input type="text" 
                  placeholder="Jhon Doe"
                  formControlName="name" 
                  autocomplete="off"/>
                <p *ngIf="getError('name')" class="inputError">
                      {{ getError('name') }}
                </p>
              </label>
            </div>
    
            <div>
              <label>
                <span>Email</span>
                <input type="email" 
                  placeholder=""  
                  formControlName="email" 
                  autocomplete="off" />
                <p *ngIf="getError('email')" class="inputError">
                      {{ getError('email') }}
                </p>
              </label>
            </div>
    
            <div>
              <label>
                <span>Rol</span>
                <select formControlName="role">
                  <option value="">Selecciona un rol</option>
                  <option *ngFor="let role of roles" [value]="role">{{ role | titlecase }}</option>
                </select>
              </label>
            </div>
    
            <div>
              <label><span>Created:</span><span>{{user?.createdAt | date:'medium'}}</span></label>
            </div>
            <div *ngIf="user?.updatedAt">
              <label><span>Modified:</span><span>{{user?.updatedAt | date:'medium'}}</span></label>
            </div>
          </ng-container>

        <hr>

        <PRE>{{this.user | json}}</PRE>
        
        <div class="fm_actions">
          <button type="button" (click)="cancelar()">Cancelar</button>
          <button *ngIf="mode != 'view'" type="submit" [disabled]="form.invalid || form.pristine">    
            {{ user?.id ? 'Modificar' : 'Guardar' }}
          </button>
        </div>

      </form>


`
})
export class UserFormComponent {
    @Input() user?: User;
    @Input() roles?: string[] = [];
    @Input() mode?: string = 'edit'; // 'view' o 'edit'
    @Output() save = new EventEmitter<User>();
    @Output() cancel = new EventEmitter<string>();
    form!: FormGroup;
    
    constructor(private fb: FormBuilder,private userService: UserService) {}
    
    ngOnInit(): void {

        console.log("user en form", this.user);

        const userData = this.user || this.userService.userEmpty;

        this.form = this.createFbGroup(userData); // Inicializa el formulario con los valores del usuario vacío
    
        this.form.patchValue(userData); 
        // Si se proporciona un usuario, actualiza el formulario con sus valores, 
        // de lo contrario, usa el usuario vacío
         // los dos son iguales , pero patch mete en el form los que vengan 
         // y set mete todos y si no vienen los borra, por eso es mejor patch
         //this.form.patchValue(userData);
         //this.form.setchValue(userData);    
    }
    
    createFbGroup(user: User) {
      // return this.fb.group({
      //   id: [user.id],
      //   name: [user.name],
      //   email: [user.email],
      //   isActive: [user.isActive],
      //   role: [user.role],
      //   permissions: [user.permissions]
      // });
      return createUserForm(this.fb,user);

    }
    
    get value(): User {

        return { ...this.user ,  ...this.form.value, "updatedAt": new Date() };
    }
    
    submit() {
        console.log("submit",this.value)
        this.save.emit(this.value);
        //throw new Error('Method not implemented.');
    }  

    cancelar() {
        console.log("cancelar")
        this.cancel.emit('cancelado');
    }  
 
    getError(controlName: string): string {
      return getErrorMessage(this.form.get(controlName));
    }


    
}