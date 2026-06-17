import { CommonModule } from '@angular/common';
import { Component, inject, Input, Signal } from '@angular/core'; 
import { NotificationUiService } from '../../../../core/services/notificactions.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],  
  template:`


       <div class="msgInfo" >

            <div class="msj" [ngClass]="notificationUi.state()?.type">{{notificationUi.state()?.message}}</div>  
       
            <!-- <div  class="success">
                <div class="msj msjOk">el mensajeeee</div>  
            </div> -->

            <!-- <div *ngIf="" class="error">
                <div class="msj msjError">{{notificationUi}}</div>
            </div> -->
        </div>



`
})
export class NotificationsComponent { 
  
    public notificationUi = inject(NotificationUiService)



}
