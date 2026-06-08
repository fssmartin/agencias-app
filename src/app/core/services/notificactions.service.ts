import { computed, Injectable, signal } from "@angular/core";
import { NotificacionUiState } from "../models/notifications.models";

@Injectable({ providedIn: 'root' })
export class NotificationUiStateService {

  private _state = signal<NotificacionUiState>({
    currentNotification:8
  });
  state = this._state.asReadonly();

  //COMPUTADAS 
  countNotification = computed(()=>( this.state()?.currentNotification));


}
