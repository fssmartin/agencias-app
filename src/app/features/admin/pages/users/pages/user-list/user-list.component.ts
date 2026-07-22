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

        <!-- <app-search></app-search> -->

        <app-table-list 
            (sort)="onSortBy($event)"
            (delete)="onDelete($event)"
            [data]=userStore.orderDataState()
            [fieldOrder] = userStore.fieldOrderState()
            [direcOrder] = userStore.direcOrderState()
            [itemSelected] = this.userState().selectedUser?.id          
            [tableConfig]=tableConfig>
        </app-table-list>  

    </ng-container> 

    <!-- <pre>{{userState()| json }}</pre> -->
  `
})
export class UserListComponent {
  
  // private userService = inject(UserService);
  public userStore = inject(UserStore);

  userState = this.userStore.state;
  
  msgLoad :string = "Cargando Lista Usuarios";
 
 tableConfig:any = {
            columns : [
              { key: ['isActive'],  label: '' ,      type :'boolean'  , order:false, class:'noBorder' },
              { key: ['role'],      label: '' ,      type :'role'     , order:false, class:'noBorder' },
              { key: ['fullName'],  label: 'Name' ,  type :'text'     , order:false, class:''  },
              { key: ['email'],     label: 'Email' , type :'email'    , order:true , class:''  },
            ],
            order: true,
            lbCreation: 'User',
            minheight:'100px',
            maxheight:'200px',    
            pagination: { toPagination:true, total:true, perpage:true },
            //paginationf: null
  }
 
  
  private timeoutId: any;

  constructor(
    // public authService:AuthService 
  ){    

    effect(()=>{
          //const error     = this.userState().error;
          const userSelec = this.userState().selectedUser;

          console.log("1 EFFECT ---- userSelec, ",userSelec)

          if(!userSelec) return; 

          // cuando Modifico o Creo un usuario 
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
      console.log("field ??__ ",field,this.userStore.direcOrderState())
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