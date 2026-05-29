import { CommonModule } from '@angular/common';
import {Component, Input, } from '@angular/core'; 
import { Observable } from 'rxjs';
 
import { Router, RouterLink, RouterLinkActive,   } from '@angular/router';

import { UserService } from '../../../../features/admin/users/user.service';
import { NavLink } from '../../../models/navlink.model';
import { User } from '../../../../core/models/users.models';

 
@Component({
  selector: 'app-navbar', 
  standalone: true,
  templateUrl: './navbar.component.html'  ,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent  {  
 
  @Input() links:NavLink[] = []; 
  @Input() exact = false; 
  

  constructor( 
    private router: Router
  ) {}

 ngOnInit(): void {
    console.log('navbar init'); 
  }

 
}
