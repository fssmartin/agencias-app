import { computed, DestroyRef, inject, Injectable, signal } from "@angular/core";
import { ImageService } from "./images.service";
import { Router } from "@angular/router";
import { NotificationUiService } from "../../../../core/services/notificactions.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActionImage, BaseImage, ImageState } from "./models/image.model";
import { ApiState } from "../../models/api.model";

@Injectable({ providedIn: 'root' })
export class ImageStore {

    
    private destroyRef = inject(DestroyRef); // ✅ CLAVE

    // private  _state = signal<ImageState>({
    //     selectedImage : null,
    //     data: [],
    //     loading: false,
    //     error: false,
    // });

    private  _state = signal<ApiState<BaseImage, ActionImage>>({
        data: [],
        selectedItem : null,
        loading: false,
        error: false,
    });    

    
    // 👇 Expones el estado como readonly
    readonly state = this._state.asReadonly();

    sortState = signal<{field: string; dir: 'asc' | 'desc' }>({field:'desc',dir:'asc'})

    direcOrderState = computed(() => this.sortState().dir );
    fieldOrderState = computed(() => this.sortState().field );   

    orderDataState = computed(() =>  {
        const data = this._state().data;

        const { field, dir } = this.sortState();

        return [...data].sort((a, b) => {

            const valueA = (a as any)[field];
            const valueB = (b as any)[field];

            let result = 0;

            console.log("_____orderDataState ?? ", field, dir)

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

    constructor(private imageService: ImageService,
        private router: Router,
        private notificationUi:NotificationUiService
    ) {}

    getImages():void{

        console.log("__ store getImages",this._state());

        // CARGANDO !
        this._state.update(s=>({...s, loading:true}));
        // solo cambio el loading.. el userSelected a null no , pq aqui entra la primera vez como cuando, editas o creas.. para seleccionar en listado

        this.imageService.getImages()
        .pipe(takeUntilDestroyed(this.destroyRef)) 
        .subscribe({
            next:(data)=>{
                console.log("ok ")
                this._state.update(s=> ({...s, data: data,loading:false,error:false}))
            },
            error:(err)=>{
                console.log("error ")
                this._state.update(s=> ({...s, data: [], loading:false,error:true}))
                this.notificationUi.error(err.message);
            },
            complete:()=>{
                console.log("complete ",this._state())
                this.notificationUi.show();// para el setTimeout y ocultar..
            }
        })

    }
 
    initState(){   
        // CARGANDO ! 
        this._state.update(s=>({...s, selectedUser:null, loading:true,error:false}))
        // LIMPIO 
        this.notificationUi.cleanNotify();
    }

    cleanMsgState(reload:boolean){    
        console.log("-- STORE USER , -- cleanMsgState --> updateState cleanNotify")
        this._state.update(s=>({...s, selectedUser:null, loading:reload,error:false,}))
        this.notificationUi.cleanNotify();

        if(reload) this.router.navigate(['/admin/images']);  
    }

}