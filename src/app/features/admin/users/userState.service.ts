import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class UserUiStateService {
  private highlightUserId: string | null = null;
  private action: 'create' | 'update' | null = null;

  setState(userId: string, action: 'create' | 'update') {
    this.highlightUserId = userId;
    this.action = action;
  }

  consumeState() {
    const state = {
      userId: this.highlightUserId,
      action: this.action
    };

    // ✅ SE LIMPIA automáticamente (clave)
    this.highlightUserId = null;
    this.action = null;

    return state;
  }
}