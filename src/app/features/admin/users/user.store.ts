import { Injectable, signal } from "@angular/core";
import { User, UserState } from "../../../core/models/users.models";
import { UserService } from "./user.service";
import { Router } from "@angular/router";
import { NotificationUiService } from "../../../core/services/notificactions.service";

@Injectable({ providedIn: 'root' })
export class UserStore {

  private  _state = signal<UserState>({
    selectedUser : null,
    data: [],
    loading: false,
    error: false,
//    msg: null as string | null
  });

  // 👇 Expones el estado como readonly
  readonly state = this._state.asReadonly();

  constructor(private userService: UserService,
    private router: Router,
    private notificationUi:NotificationUiService
  ) {}

  getUsers():void{

    console.log("__ store getUsers");

    this._state.update(s=>({...s, loading:true,}));
    // solo cambio el loading.. el userSelected a null no , pq aqui entra la primera vez como cuando, editas o creas.. para seleccionar en listado

    this.userService.getUsuarios()
    .subscribe({
            next:(data)=>{
                this._state.update(s=> ({...s, data: data,loading:false,error:false}))
            },
            error:(err)=>{
                this._state.update(s=> ({...s, data: [], loading:false,error:true}))
                this.notificationUi.error(err.message);
            },
            complete:()=>{
                this.notificationUi.show();// para el setTimeout y ocultar..
            }
    })

  }

  deleteUser(id:string):void{

    this.initState();
    
    console.log("__ store deleteUser")

    // como copia de seguridad...
    const previous = this._state().data;

    this.userService.deleteById(id)
    .subscribe({
            next:(data)=>{    
                //no llamo de nuevo a getUser a back... modifico el array            
                this._state.update(s=>({...s,data: s.data.filter(u => u.id !== id),loading:false}))
                this.notificationUi.success('✅ Usuario borrado correctamente');
            },
            error:(err)=>{
                this._state.set({selectedUser:null,data: previous,loading:false,error:true})
                this.notificationUi.error(err.message);
            }
        }) 
  }

  getUserById(id:string):void{

    console.log("__ store getUserById")
    
    this.initState();

    this.userService.getById(id)
    .subscribe({
        next:(data)=>{    
            this._state.update(s=>({...s, selectedUser:data ,loading:false,error:false}))
        },
        error:(err)=>{
            this._state.update(s=>({...s, selectedUser:null ,loading:false,error:true}))
            this.notificationUi.error(err.message);
        }
    })  
  }

  updateUser(user:User):void{

    console.log("__ store updateUser")

    const previous = this._state().data;

    this.initState();

    this.userService.updateUser(user)
    .subscribe({
            next:(request)=>{
                //actualizo el usuario en la signal con el user que me trae ..
                this._state.update(s => ({
                        ...s,
                        selectedUser:request,
                        data: s.data.map(u =>
                            u.id === request.id ? request : u
                        )
                }));
                this.notificationUi.success('✅ Usuario actualizado correctamente');
                this.router.navigate(['/admin/users']);
            },
            error:(err)=>{
                this._state.set({selectedUser:null,data: previous,loading:false,error:true})
                this.notificationUi.error(err.message);            }
        })

  }

  createUser(user:User):void{

    console.log("__ store createUser")

    const previous = this._state().data;
    
    this.initState();

    this.userService.createUser(user)
    .subscribe({
            next:(request)=>{
                //actualizo el usuario en la signal con el user que me trae ..
                this._state.update(s => ({
                        ...s,
                        selectedUser:request,
                        data: [...s.data, request]
                }));
                this.notificationUi.success('✅ Usuario creado correctamente');
                this.router.navigate(['/admin/users']); 
            },
            error:(err)=>{
                this._state.set({selectedUser:null,data: previous,loading:false,error:true})
                this.notificationUi.error(err.message);
            }
        }) 
  }

  initState(){    
    this._state.update(s=>({...s, selectedUser:null, loading:true,error:false}))
    this.notificationUi.cleanNotify();
  }


  cleanMsgState(reload:boolean){    
    this._state.update(s=>({...s, selectedUser:null, loading:reload,error:false,}))
    this.notificationUi.cleanNotify();
    if(reload) this.router.navigate(['/admin/users']);  
  }

}