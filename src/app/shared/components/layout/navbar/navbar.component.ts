import { CommonModule } from '@angular/common';
import {Component, Input, } from '@angular/core'; 
 
import {   RouterLink, RouterLinkActive,   } from '@angular/router';

import { NavLink } from '../../../models/navlink.model';
import { AuthService } from '../../../../features/auth/auth.service';
import { NotificationsComponent } from "../notifications/notifications.component";
import { NotificationUiStateService } from '../../../../core/services/notificactions.service';

 
@Component({
  selector: 'app-navbar', 
  standalone: true,
  templateUrl: './navbar.component.html'  ,
  imports: [RouterLink, RouterLinkActive, CommonModule, NotificationsComponent,],
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent  {  
 
  @Input() isHeader:boolean = false; 
  @Input() links:NavLink[] = []; 
  @Input() exact = false; 
 

  constructor( 
    public authService:AuthService ,
    public notificationService:NotificationUiStateService ,
    
  ) {}

 ngOnInit(): void {
    console.log('navbar init'); 
  }
  

 
}
