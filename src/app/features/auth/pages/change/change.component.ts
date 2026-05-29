import { Component } from '@angular/core'; 
import { Router,  } from '@angular/router'; 

 
 
 

@Component({
  selector: 'app-change',
  imports: [],
  standalone: true,
  templateUrl: './change.component.html' 
})
export class ChangeComponent { 
   
  
  isError:boolean  = false;
  disabled:string = ''; 

  constructor(
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
