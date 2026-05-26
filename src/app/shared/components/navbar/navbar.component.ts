import { CommonModule } from '@angular/common';
import {Component, Input, } from '@angular/core'; 
 
import { Router, RouterLink, RouterLinkActive,   } from '@angular/router';
import { NavLink } from '../../models/agencia.model';

 
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


  constructor(private router: Router) {}

 

 
}
