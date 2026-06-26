import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { LoadingComponent } from "../../../../../../shared/components/ui/loading/loading.component";
 
import { UserService } from '../../user.service'; 
// import { AuthService } from '../../../../../auth/auth.service';
import { UserStore } from '../../user.store';
import { NotificationsComponent } from "../../../../../../shared/components/ui/notifications/notifications.component";
import { TableListComponent } from "../../../../components/table-list/table-list.component";
import { User } from '../../models/user.model';
import { ListUser } from '../../models/list-user.model';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule,  LoadingComponent, NotificationsComponent, TableListComponent],
  template: `
 
    <h4 *ngIf="!userState()?.loading">
       <span>User List</span>
       <app-notifications></app-notifications>
    </h4> 

    <!-- <app-loading *ngIf="loading$ | async"></app-loading> -->
    <app-loading  [texto]="msgLoad" *ngIf="userState()?.loading"></app-loading>
 

    <!-- <ng-container *ngIf="!(loading$ | async)"> -->
    <ng-container  *ngIf="!userState()?.loading">

      <app-table-list 
          (sort)="onSortBy($event)"
          (delete)="onDelete($event)"
          [fieldOrder] = userStore.fieldOrderState()
          [direcOrder] = userStore.direcOrderState()
          [itemSelected] = this.userState().selectedUser?.id          
          [data]=userStore.orderDataState()
          [columns]="[
            { key: ['isActive'],  label: '' ,      type :'boolean' },
            { key: ['role'],      label: '' ,      type :'role' },
            { key: ['fullName'],  label: 'Name' ,  type :'text' },
            { key: ['email'],     label: 'Email' , type :'text'}
          ]">
      </app-table-list>

        <!-- <table *ngIf="sortedUsers$ | async as users" 
        <table 
          class="listTable">
          <tr>
            <th></th>
            <th (click)="onSortBy('name')">
                Name
              <span *ngIf="( userStore.fieldOrderState() ) === 'name'">
                {{  userStore.direcOrderState() === 'asc' ? '▲' : '▼' }}
              </span> 
            </th>
            <th (click)="onSortBy('email')">
                Email  
              <span *ngIf="( userStore.fieldOrderState() ) === 'email'">
                {{  userStore.direcOrderState() === 'asc' ? '▲' : '▼' }}
              </span>
            </th>
            <th><button 
                  routerLink="edit"  
                  [queryParams]="{ mode: 'create' }"
                  class="fRight btEnlace btCrear">Crear Usuario</button></th>
          </tr>
          <tr *ngFor="let user of userStore.orderDataState(); trackBy: trackById"
              [ngClass]="{ 'highlight-row': user.id === this.userState().selectedUser?.id}">
            <td>
                <span [title]="user.isActive + ' Usuario'">{{ user.isActive ? '✅' : '❌' }}</span>
                <span [title]="user.role">{{ user.role === 'ADMIN' ? '🛡️' : user.role === 'MANAGER' ? '📊' : '👤' }}</span>
            </td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}-{{ user.id }}</td>
            <td>
              <button [routerLink]="['edit', user.id]"
                      [queryParams]="{ mode: 'view' }" title="Show">
                      <i class="fa-solid fa-eye"></i></button>
              <button [routerLink]="['edit', user.id]" 
                       [queryParams]="{ mode: 'edit' }" title="Edit">
                       <i class="fa-solid fa-pencil"></i></button>
              <button (click)="deleteUser(user)" 
                      [ngClass]="user.id===authService.currentUser()?.id ? 'disabled' : ''"
                      [disabled]="user.id===authService.currentUser()?.id" >
                      <i class="fa-regular fa-trash-can"></i></button>
            </td>
          </tr>
          <tr *ngIf="userState()?.data; else noUsers">
            <td></td>
            <td  colspan="4" text-align="right">Total: <strong>{{ userState()?.data?.length }}</strong></td>
          </tr>
          <ng-template #noUsers>
            <tr>
              <td colspan="5" class="notFound" style="text-align: center;">
                No users
              </td>
            </tr>
          </ng-template>
        </table>   
         -->
    </ng-container> 

    <!-- <pre>{{userState()| json }}</pre> -->
  `
})
export class UserListComponent {
  
  // private userService = inject(UserService);
  public userStore = inject(UserStore);

  userState = this.userStore.state;
  
  msgLoad :string = "Cargando Lista Usuarios";
 
  //selectedUser: User = this.userService.userEmpty;

  // highlightedUserId: string | null = null;
  // successMessage: string | null = null;
  // loadingSignal = this.userService.loadingSignal;
  // errorSignal   = this.userService.errorSignal;

  

  // public userState = toSignal(
  //           this.userService.getUsuarios().pipe(
  //             delay(1400),
  //             map(data => ({ data, loading: false, error: null })),
  //             catchError(err => of({ data: [], loading: false, error: err.message })),
  //             // startWith define el estado exacto inicial del componente de manera síncrona
  //             startWith({ data: [], loading: true, error: null })
  //           )
  // );

  // sortField$ = new BehaviorSubject<keyof User>('name');
  // sortDirection$ = new BehaviorSubject<'asc' | 'desc'>('asc');

  // sortedUsers$ = combineLatest([
  //   this.users$,
  //   this.sortField$,
  //   this.sortDirection$
  // ]).pipe(

  //       map(([users, field, direction]) => {
  //         return [...users].sort((a, b) => {
  //           const valueA = a[field]!;
  //           const valueB = b[field]!;

  //           let result = 0;

  //           if (valueA instanceof Date && valueB instanceof Date) {
  //             result = valueA.getTime() - valueB.getTime();
  //           } else if (typeof valueA === 'string' && typeof valueB === 'string') {
  //             result = valueA.localeCompare(valueB);
  //           } else if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
  //             result = Number(valueA) - Number(valueB);
  //           } else {
  //             result = valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
  //           }

  //           return direction === 'asc' ? result : -result;
  //         })
  //       })
  // )  
  
  private timeoutId: any;

  constructor(
    // public authService:AuthService 
  ){    

    effect(()=>{
          const error     = this.userState().error;
          const userSelec = this.userState().selectedUser;

          console.log("EFFECT ---- userSelec, ",userSelec)

          if(!userSelec) return;
            
          clearTimeout(this.timeoutId);

          this.timeoutId = setTimeout(() => {
            console.log("________________________________________ setTimeout LISTADO")
            this.userStore.cleanMsgState(false);
            this.msgLoad = 'Cargando Lista Usuarios'
          }, 3000);
          
    })

  }

  ngOnInit(): void {
 
        // me viene de edit o create, y se cual ha sido el id actualizado para hacer algun efecto jejeje       
        //const { userId, action } = history.state || {};
        // console.log('UserListComponent ngOnInit - history.state:', history.state);


      // tenemos ahora un store que limpia el componente de funcionalidad...  
      this.userStore.getUsers();

        // const { userId, action } = this.UserUiStateService.consumeState() || {};   
        // if ( userId && action) {             
        //     this.showMessageState({userId ,action})
        // } 

  } 
 
 
  //Cambiar orden
  onSortBy(field: keyof ListUser) { 
 
      this.userStore.sortState.set(
          {
            field:field,
            dir: this.userStore.direcOrderState() ===  'asc' ? 'desc' : 'asc'
          }
        )
 
  }

  // de la tabla generica , OUTPUT
  onDelete(id:string){
    console.log("user a borrar", id)
    if(!id) return;
        
    if (confirm('¿Está usted seguro de borrar este usuario?')) {
        this.msgLoad = "Deleting User";
        this.userStore.deleteUser(id);
    }    
  } 
  
  deleteUser(id: string) {

      if(!id) return;
           
      if (confirm('¿ Está usted seguro de borrar este usuario ?')) {
          this.msgLoad = "Deleting User !!!"
          this.userStore.deleteUser(id);    
      }

  } 
  
  // no vale ya
  // showMessageState(state:any){
  //     this.highlightedUserId = state.userId;
  //     this.successMessage = state.action === 'create'
  //       ? '✅ Usuario creado correctamente'
  //       : state.action === 'delete' ? '✅ Usuario borrado correctamente'
  //       : '✅ Usuario actualizado correctamente';

  //     setTimeout(() => {
  //       this.successMessage = null;
  //       this.highlightedUserId = null;
  //       this.UserUiStateService.cleanState();
  //     }, 3000); // desaparece en 3s
  // }


  //Solo actualiza los que cambian
  // trackById(index: number, user: User) {
  //   return user.id;
  // }
  
}