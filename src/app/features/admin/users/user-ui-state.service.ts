



// NO LO USAMOS PARA NADA !

import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class UserUiStateService {
  private highlightUserId: string | null = null;
  private action: 'create' | 'update' | 'delete' | null = null;

  setState(userId: string, action: 'create' | 'update' | 'delete') {
    this.highlightUserId = userId;
    this.action = action;
  }

  consumeState() {
    const state = {
      userId: this.highlightUserId,
      action: this.action
    };

    // ✅ SE LIMPIA automáticamente (clave)
    this.cleanState();
    
    return state;
  }

  cleanState(){
    this.highlightUserId = null;
    this.action = null;
  }
}