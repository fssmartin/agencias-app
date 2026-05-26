import { Component} from '@angular/core';  
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports:[RouterLink],
  standalone: true,
  template: `
    <div class="container">
        <div class="col">
          
            <img src="images/404.jpg" alt="Página no encontrada" style="position:absolute; width: 200px; opacity:0.3;right:0;top:-35px;">

            <h3>404 - Not Found</h3>
            <p>The page you are looking for does not exist.</p> 
            <a routerLink="/">Volver al inicio</a>
          
        </div>
    </div>       
  `
})
export class NotFoundComponent {  


  constructor( ){  } 

}



