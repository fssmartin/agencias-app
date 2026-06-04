import { CommonModule } from '@angular/common';
import {Component, Input, } from '@angular/core'; 
 
import { Router, RouterLink, RouterLinkActive,   } from '@angular/router';

import { NavLink } from '../../../models/navlink.model';
import { AuthService } from '../../../../features/auth/auth.service';

 
@Component({
  selector: 'app-navbar', 
  standalone: true,
  templateUrl: './navbar.component.html'  ,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent  {  
 
  @Input() isHeader:boolean = false; 
  @Input() links:NavLink[] = []; 
  @Input() exact = false; 
 

  constructor( 
    public authService:AuthService,
    private router: Router
  ) {}

 ngOnInit(): void {
    console.log('navbar init'); 
  }
  

 
}
