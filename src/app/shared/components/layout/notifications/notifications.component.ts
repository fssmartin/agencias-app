import { CommonModule } from '@angular/common';
import { Component, Input, Signal } from '@angular/core'; 

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],  
  template:`
    <div class="notifications">
        <i class="fa-solid fa-bell"></i>
        <span class="badge" *ngIf="count() > 0">
          {{ count() > 9 ? '9+' : count() }}
      </span>
  </div> 
  `
})
export class NotificationsComponent { 
  @Input() count!:Signal<number>;
}
