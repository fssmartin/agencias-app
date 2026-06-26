import {  DestroyRef, inject, Injectable, signal } from "@angular/core";

import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

import { MercanService } from "../service/mercan.service";
import { MercanState } from "../model/mercan.models";

@Injectable({ providedIn: 'root' })
export class MercanStore {

    private destroyRef = inject(DestroyRef); // ✅ CLAVE

    private  _state = signal<MercanState>({
        data: null,
        loading: false,
        error: false,
    });

    
  // 👇 Expones el estado como readonly
  readonly state = this._state.asReadonly();

    constructor(
        private mercanService: MercanService
    ) {

    }

    getMercans():void{

        console.log("__ store AEMET !");

        this._state.update(s=>({...s, loading:true}));

        this.mercanService.getData()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
                next:(data)=>{
                    console.log("ok ",data)
                    this._state.update(s=> ({...s, data: data,loading:false,error:false}))
                },
                error:(err)=>{
                    console.log("error ")
                    this._state.update(s=> ({...s, data: null, loading:false,error:true}))
                },
                complete:()=>{
                    console.log("complete ",this._state())
                }
        })

    }
 
 
  

}