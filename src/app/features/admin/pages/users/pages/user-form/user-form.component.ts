import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output , input, effect } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../user.service';

import { createUserForm } from './user-valid.form';
import { getErrorMessage } from '../../../../../../shared/utils/forms/form-errors';
import { FechaEsPipe } from '../../../../../../shared/utils/pipes/fecha-es.pipe';
import { UserStore } from '../../user.store';
import { ActionUser, User } from '../../models/user.model';


@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule ,ReactiveFormsModule,FechaEsPipe],
  template: ` 

 

      <form [formGroup]="form" (ngSubmit)="submit()" autocomplete="off" 
            [ngClass]="{
              'form form-view': mode() === 'view',
              'form form-edit': mode() === 'edit',
              'form form-create': mode() === 'create'
              }"
      >

        <ng-container *ngIf="mode() === 'edit' || mode()=== 'create'" >

            <div>
              <label><span>Active</span>
                <input type="checkbox" formControlName="isActive"/>
              </label> 
            </div>

            <div>
              <label>
                <span>Nick</span>
                <input type="text" 
                  placeholder="JhonDereck"
                  formControlName="username" 
                  autocomplete="off"/>
                <div class="divError" style="width:100%;display:flex;justify-content:left;flex-direction:column">
                  <p *ngFor="let errorField of getError('username')" class="inputError">
                    {{ errorField }}
                  </p>
                </div>
              </label>
            </div>            

            <div>
              <label>
                <span>First Name</span>
                <input type="text" 
                  placeholder="Jhon"
                  formControlName="firstname" 
                  autocomplete="off"/>
                <div class="divError" style="width:100%;display:flex;justify-content:left;flex-direction:column">
                  <p *ngFor="let errorField of getError('firstname')" class="inputError">
                    {{ errorField }}
                  </p>
                </div>
              </label>
            </div>
 
           <div>
              <label>
                <span>Last Name</span>
                <input type="text" 
                  placeholder="Doe"
                  formControlName="lastname" 
                  autocomplete="off"/>
                <div class="divError" style="width:100%;display:flex;justify-content:left;flex-direction:column">
                  <p *ngFor="let errorField of getError('lastname')" class="inputError">
                    {{ errorField }}
                  </p>
                </div>
              </label>
            </div>                       

            <div>
              <label>
                <span>Email</span>
                <input type="email" 
                   placeholder="m@example.com"
                   formControlName="email" 
                   autocomplete="off" />
                <div class="divError" style="width:100%;display:flex;justify-content:left;flex-direction:column">
                  <p *ngFor="let errorField of getError('email')" class="inputError">
                    {{ errorField }}
                  </p>
                </div>
              </label>
            </div>

            <div *ngIf="mode() === 'create'">
              <label>
                <span>Password</span>
                <input type="password" 
                   placeholder="Create a secure password"
                   formControlName="password" 
                   autocomplete="off" />  
                <div class="divError" style="width:100%;display:flex;justify-content:left;flex-direction:column">
                  <p *ngFor="let errorField of getError('password')" class="inputError">
                    {{ errorField }}
                  </p>
                </div> 
              </label>
            </div>            
    
            <div>
              <label>
                <span>Rol</span>
                <select formControlName="role">
                  <option value="">Selecciona un rol</option>
                  <option *ngFor="let role of roles()" [value]="role">{{ role | titlecase }}</option>
                </select>
              </label>
            </div> 
            
            <div>
              <label><span>Created:</span><span>{{user()?.createdAt! | fechaEs }}</span></label>
            </div>
            <div *ngIf="user()?.updatedAt">
              <label><span>Modified:</span><span>{{user()?.updatedAt! | fechaEs }}</span></label>
            </div>

          </ng-container>

        <hr>

        <PRE>{{ (this.user() && this.mode()!='create'? this.user() : userService.userEmpty ) | json}}</PRE>
        
        <div class="fm_actions">
          <button type="button" (click)="cancelar()" class="btCancel">Volver</button>
          <button *ngIf="mode() != 'view' && !error()" type="submit" 
            [disabled]="form.invalid || form.pristine">    
            {{ mode() === 'create' ? "Grabar" : "Modificar"}}
          </button>
        </div>

      </form>


`
})
export class UserFormComponent {
    //@Input() user?: User;
    user  = input<ActionUser>();
    error = input<boolean>();
    roles = input<string[]>([]);
    mode  = input<string>('edit');

    // @Input() roles?: string[] = [];
    // @Input() mode?: string = 'edit'; // 'view' o 'edit'

    @Output() save = new EventEmitter<User>();
    @Output() cancel = new EventEmitter<string>();

    form!: FormGroup;
    
    private userStore = inject(UserStore);

    readonly userState = this.userStore.state;

    constructor(
        private fb: FormBuilder,
        public userService: UserService) {

      // AL SER Reactive Forms no podemos poner  [disabled] en el template en los (inputs...).
      // usamos un effect y desalbilitamos el formulario NO el input.
       effect(()=>{
          const error     = this.userState().error;
          console.log("EFFECT ---- FORM COMPONENTES ERROR, ",error)

          if(!error) return;

          this.form.disable()

      })




    }
    
    ngOnInit(): void {

        console.log("___ user() ",  this.user() );
        console.log("___ user en form",  this.user() ? this.user() : this.userService.userEmpty    );

//        this.user() = this.user() && this.mode()!='create'? this.user : this.userService.userEmpty
        
        //const userData = this.user();
       // userData.password = '';

        this.form = this.createFbGroup( this.user() ? this.user()! : this.userService.userEmpty ); 
    
        this.form.patchValue( this.user() ? {
              isactive  :this.user()!.isActive,
              username  :this.user()!.username,
              firstname :this.user()!.firstname,
              lastname  :this.user()!.lastname,
              email     :this.user()!.email,              
              role      :this.user()!.role,              
              // password  :this.user()!.password,
              // createdAt :this.user()!.createdAt,
              // updatedAt :this.user()!.updatedAt
            } : this.userService.userEmpty );

        // Si se proporciona un usuario, actualiza el formulario con sus valores, 
        // de lo contrario, usa el usuario vacío
         // los dos son iguales , pero patch mete en el form los que vengan 
         // y set mete todos y si no vienen los borra, por eso es mejor patch
         //this.form.patchValue(userData);
         //this.form.setchValue(userData);    
         
        // if(userData.id=='' || this.mode==='create' ){
        //       this.form.reset({
        //         email:'',
        //         name:'',
        //         password: '',
        //         role:'ADMIN'
        //     }); 
        // }
    }
    
    createFbGroup(user: ActionUser) {
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
        this.cancel.emit('cancelado');
    }  
 
    // getError(controlName: string): string {
    //   return getErrorMessage(this.form.get(controlName));
    // }

    getError(controlName: string): string[] {
      const control = this.form.get(controlName);
      if (!control || !control.errors || !(control.touched || control.dirty)) {
        return [];
      }
      return getErrorMessage(control);
    }    
}