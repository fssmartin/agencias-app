import { Component, Renderer2, computed, effect, signal } from '@angular/core'; 
import { Router, RouterLink } from '@angular/router'; 

 

 

@Component({
  selector: 'app-forget',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './forget.component.html' 
})
export class ForgetComponent { 
  
  
  
  isError:boolean  = false;
  disabled:string = '';
  loading:boolean  = true; 
 

  constructor(private router: Router, 
    private renderer: Renderer2, ){  
 
  } 

  ngOnInit(){
  }
   
  reset():void{   


/* TEXTO DEL CORREO QUE LE LLEGARA...
    Estimado ASD@ASD.ES,
    Has solicitado restablecer tu contraseña, para restablecer tu contraseña haz click en el botón que se encuentra en la parte inferior.
    El enlace para recuperar la contraseña tendrá una validez de 24 horas, si no has solicitado cambiar la contraseña, ignora este mensaje.
*/

 
  }

  ngOnDestroy():void {  
  }
}

