import { Injectable, signal } from "@angular/core";
import { User, UserState } from "../../../core/models/users.models";
import { UserService } from "./user.service";
import { UserUiStateService } from "./user-ui-state.service";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class UserStore {

  private  _state = signal<UserState>({
    selectedUser : null,
    data: [],
    loading: false,
    error: null as string | null,
    msg: null as string | null
  });

  // 👇 Expones el estado como readonly
  readonly state = this._state.asReadonly();

  constructor(private userService: UserService,
    private userUiStateService: UserUiStateService,
    private router: Router
  ) {}

  getUsers():void{

    console.log("__ store getUsers")

    this._state.update(s=>({...s,  data:[], loading:true}))

    this.userService.getUsuarios()
    .subscribe({
            next:(data)=>{
                this._state.update(s=> ({...s, data: data,loading:false}))
            },
            error:(err)=>{
                this._state.update(s=> ({...s, data: [], loading:false,error:err.message,}))
            }
    })

  }

  deleteUser(id:string):void{
    this._state.update(s=>({...s,  selectedUser:null, loading:true,error:null,msg:'✅ Usuario borrado correctamente'}))

    console.log("__ store deleteUser")

    const previous = this._state().data;

    this.userService.deleteById(id)
    .subscribe({
            next:(data)=>{    
                //no llamo de nuevo a getUser modifico el array            
                this._state.update(s=>({...s,data: s.data.filter(u => u.id !== id),loading:false}))
            },
            error:(err)=>{
                this._state.set({selectedUser:null,data: previous,loading:false,error:err.message,msg:null})
            }
        }) 
  }

  getUserById(id:string):void{

    console.log("__ store getUserById")
    this._state.update(s=>({...s,  selectedUser:null, loading:true,error:null}))

    this.userService.getById(id)
    .subscribe({
            next:(data)=>{    
                this._state.update(s=>({...s, selectedUser:data ,loading:false}))
            },
            error:(err)=>{
                this._state.update(s=>({...s, selectedUser:null ,loading:false,error:err.message}))
            }
        })  
  }

  updateUser(user:User):void{

    const previous = this._state().data;
    this._state.update(s=>({...s,selectedUser:null, loading:true,error:null,msg:'✅ Usuario actualizado correctamente'}))

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
                this.router.navigate(['/admin/users']);
            },
            error:(err)=>{
                this._state.set({selectedUser:null,data: previous,loading:false,error:err.message,msg:null})
            }
        })

  }

  createUser(user:User):void{

    const previous = this._state().data;
    this._state.update(s=>({...s,selectedUser:null, loading:true,error:null,msg:'✅ Usuario creado correctamente'}))

    this.userService.createUser(user)
    .subscribe({
            next:(request)=>{
                //actualizo el usuario en la signal con el user que me trae ..
                this._state.update(s => ({
                        ...s,
                        selectedUser:request,
                        data: [...s.data, request]
                }));
                this.router.navigate(['/admin/users']); 
            },
            error:(err)=>{
                this._state.set({selectedUser:null,data: previous,loading:false,error:err.message,msg:null})
            }
        }) 
  }

  cleanMsgState(reload:boolean){    
    this._state.update(s=>({...s,selectedUser:null, loading:reload,error:null,msg:''}))
    if(reload) this.router.navigate(['/admin/users']);  
  }

}