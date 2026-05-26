import { Component, effect, Renderer2 } from '@angular/core'; 
import { Router, RouterLink } from '@angular/router'; 

 
 
 

@Component({
  selector: 'app-change',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './change.component.html' 
})
export class ChangeComponent { 
   
  
  isError:boolean  = false;
  disabled:string = ''; 

  constructor(   
     private renderer: Renderer2, 
     private router: Router, 
     ){    

  } 

  ngOnInit(){
    
  }
 
   
  change():void{ 
 
 
  }


  ngOnDestroy():void {  
  }
}
