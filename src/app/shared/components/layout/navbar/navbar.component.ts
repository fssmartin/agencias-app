import { CommonModule } from '@angular/common';
import {Component, Input, } from '@angular/core'; 
 
import {   RouterLink, RouterLinkActive,   } from '@angular/router';

import { NavLink } from '../../../models/navlink.model';
import { AuthStore } from '../../../../features/auth/auth.store';

 
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
 
constructor(public authStore:AuthStore ){ console.log("LLamo a AuthStore constructor NavbarComponent") } 

 ngOnInit(): void {
    console.log('navbar init'); 
  }
  

 
}
