import { computed, DestroyRef, inject, Injectable, signal } from "@angular/core";
import { UserService } from "./user.service";
import { Router } from "@angular/router";
import { NotificationUiService } from "../../../../core/services/notificactions.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActionUser, UserState } from "./models/user.model";

@Injectable({ providedIn: 'root' })
export class UserStore {

    
    private destroyRef = inject(DestroyRef); // ✅ CLAVE

    private  _state = signal<UserState>({
        data: [],
        selectedUser : null,
        loading: false,
        error: false,
    });

    
    // 👇 Expones el estado como readonly
    readonly state = this._state.asReadonly();

    sortState = signal<{field: string; dir: 'asc' | 'desc' }>({field:'email',dir:'asc'})

    direcOrderState = computed(() => this.sortState().dir );
    fieldOrderState = computed(() => this.sortState().field );   

    orderDataState = computed(() =>  {
        const data = this._state().data;

        const { field, dir } = this.sortState();

        return [...data].sort((a, b) => {

            const valueA = (a as any)[field];
            const valueB = (b as any)[field];

            let result = 0;

            console.log("_____orderDataState ?? ", dir)

            if (valueA instanceof Date && valueB instanceof Date) {
                result = valueA.getTime() - valueB.getTime();
            } else if (typeof valueA === 'string' && typeof valueB === 'string') {
                result = valueA.localeCompare(valueB);
            } else if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
                result = Number(valueA) - Number(valueB);
            } else {
                result = valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
            }
            
            return dir === 'asc' ? result : -result;
        })
    });   



    constructor(private userService: UserService,
        private router: Router,
        private notificationUi:NotificationUiService
    ) {}

    getUsers():void{

        console.log("__ store getUsers");

        // CARGANDO !
        this._state.update(s=>({...s, loading:true}));
        // solo cambio el loading.. el userSelected a null no , pq aqui entra la primera vez como cuando, editas o creas.. para seleccionar en listado

        this.userService.getUsuarios()
        .pipe(takeUntilDestroyed(this.destroyRef)) 
        .subscribe({
            next:(data)=>{
                this._state.update(s=> ({...s, data: data, loading:false, error:false}))
            },
            error:(err)=>{
                if(err.status===404){
                    this.notificationUi.error("Se ha producido un error Interno..");
                }
                this._state.update(s=> ({...s, data: [], loading:false, error:true}));
            },
            complete:()=>{
                console.log("➡️ complete getUsers only next --> 3000")
                this.notificationUi.show();// para el setTimeout y ocultar..
            }
        })

    }

    getUserById(id:string):void{

        console.log("__ store getUserById,",id)
        
        this.initState();

        this.userService.getById(id)
        .pipe(takeUntilDestroyed(this.destroyRef)) 
        .subscribe({
            next:(data)=>{    
                console.log("__ok",data)
                this._state.update(s=>({...s, selectedUser:data ,loading:false,error:false}))
            },
            error:(err)=>{
                console.log("__error")
                this._state.update(s=>({...s, selectedUser:null ,loading:false,error:true}))
                this.notificationUi.error(err.message);
            }
        })  
    }

    deleteUser(id:string):void{

        this.initState();
        
        console.log("__ store deleteUser")

        // como copia de seguridad...
        const previous = this._state().data;

        this.userService.deleteById(id)
        .pipe(takeUntilDestroyed(this.destroyRef)) // ✅ ahora 
        .subscribe({
                next:(data)=>{    
                    //no llamo de nuevo a getUser a back... modifico el array            
                    this._state.update(s=>({...s,selectedUser:null,data: s.data.filter(u => u.id !== id),loading:false}))
                    this.notificationUi.success('✅ Usuario borrado correctamente');
                },
                error:(err)=>{
                    this._state.update(s=>({...s,data: previous,loading:false,error:true}))
                    this.notificationUi.error(err.message);
                },
                complete:()=>{
                    console.log("complete DELETE --- ",this._state())
                    this.notificationUi.show();// para el setTimeout y ocultar..
                }
                
            }) 
    }

    updateUser(user:ActionUser):void{

        console.log("__ store updateUser")

        const previous = this._state().data;

        this.initState();

        user.updatedAt =(new Date()).toISOString()      
    console.log("USER_________________________________________",user)
        this.userService.updateUser(user)
        .subscribe({
            next:({userSelect,userList})=>{
                //actualizo el usuario en la signal con el user que me trae ..
                this._state.update(s => ({
                        ...s,
                        selectedUser:{...userSelect},
                        data: s.data.map(u =>
                            u.id === userList.id ?  userList : u
                        )
                }));
                this.notificationUi.success('✅ Usuario actualizado correctamente');
                this.router.navigate(['/admin/users']);
            },
            error:(err)=>{
                this._state.set({selectedUser:null,data: previous,loading:false,error:true})
                this.notificationUi.error(err.message);
            }
        })
    }

    createUser(user:ActionUser):void{

        console.log("_____________________________________ store createUser", user)

        const previous = this._state().data;
        
        user.updatedAt = undefined;
        user.createdAt =(new Date()).toISOString();

        // limpio mensajes de todo tipo
        this.initState();

        this.userService.createUser(user)
        .subscribe({
                next:({userSelect, userList })=>{
                    //actualizo el usuario en la signal con el user que me trae ..
                    this._state.update(s => ({
                            ...s,
                            selectedUser:{...userSelect},
                            data: [...s.data, userList]
                    }));
                    this.notificationUi.success('✅ Usuario creado correctamente');
                    this.router.navigate(['/admin/users']); 
                },
                error:(err)=>{
                    this._state.update(s => ({
                            ...s,
                            selectedUser:user,
                            loading:false,
                            error:true}));
                    this.notificationUi.error(err.message);
                }
            }) 
    }

    initState(){   
        console.log("➡️ -- INIT STORE USER ")
        // CARGANDO ! 
        this._state.update(s=>({...s, selectedUser:null, loading:true,error:false}))
        // LIMPIO 
        this.notificationUi.cleanNotify();
    }

    cleanMsgState(reload:boolean){    
        console.log("➡️ -- STORE USER , -- cleanMsgState --> updateState cleanNotify")
        this._state.update(s=>({...s, selectedUser:null, loading:reload,error:false,}))
        this.notificationUi.cleanNotify();

        if(reload) this.router.navigate(['/admin/users']);  

    }

}