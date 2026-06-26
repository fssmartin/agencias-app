import { computed, Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

export interface Notification {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationUiService { 

  private  _state = signal<Notification|null>(null);
  
  readonly state = this._state.asReadonly();  

  // isSuccess = computed(() => this.state()?.type === 'success');  
  // isError   = computed(() => this.state()?.type === 'error');  
  // isWarning = computed(() => this.state()?.type === 'warning');  
  // isInfo    = computed(() => this.state()?.type === 'info');  

  set(notificaccion:Notification):void{
    console.log("____ modifico signal Notificacion !!")
    this._state.set(notificaccion) 
  }
  show():void{
      console.log("____ CLEAN NOTIFYYYY setTimeout !!!! 3000")
      setTimeout(() => {
        this._state.set(null);
      }, 3000);
  } 

  cleanNotify():void{
    console.log("____ CLEAN NOTIFYYYY msg success | error")
    this._state.set(null);    
  }

  success(message: string):void {
    this.set({ type: 'success', message });
    console.log("____ SUCCESS, ",message)
  }

  error(message: string):void {
    this.set({ type: 'error', message });
    console.log("____ ERROR, ",message)
  }

   
  
}