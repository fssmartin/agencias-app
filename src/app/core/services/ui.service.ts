import { computed, Injectable, signal } from "@angular/core";
import { NotificacionUiState } from "../models/notifications.models";

@Injectable({ providedIn: 'root' })
export class UiService {

  private _loadingApp = signal<boolean>(false);
  
  loadingApp = this._loadingApp.asReadonly();
  private startTime = 0;

  showLoading(){
    console.log("showLoading....")
    this._loadingApp.set(true) 
  }
  
  hideLoading(){
 
    const elapsed = Date.now() - this.startTime;
    const remaining = 3000 - elapsed;

    if (remaining > 0) {
        setTimeout(() => this._loadingApp.set(false), remaining);
    } else {
        this._loadingApp.set(false);
    }
 
  }

}
