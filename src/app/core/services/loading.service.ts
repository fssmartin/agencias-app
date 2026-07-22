import { computed, Injectable, signal } from '@angular/core';
 

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private readonly pendingRequests = signal(0);

  readonly loading = computed(() => this.pendingRequests() > 0);

  show(): void {
    console.log('----- SHOW');
    this.pendingRequests.update(n => n + 1);
  }

  hide(): void {
    console.log('----- HIDE');
    this.pendingRequests.update(n => Math.max(0, n - 1));
  }

}