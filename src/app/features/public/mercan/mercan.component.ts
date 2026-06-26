import { Component, inject} from '@angular/core';  
import { CommonModule } from '@angular/common';
import { MercanStore} from './store/mercan.store';



@Component({
  selector: 'app-weather',
  standalone: true,
  imports:[CommonModule],
  template: `
    <div class="container">
        <div class="col">
            <h3>Mercantil</h3>
            <p>This is the MERCANTIL page of the application.</p>  
            
            <pre>{{mercanState()|json}}</pre>

        </div>
    </div>     
  `
})
export class MercanComponent {  

  public mercanStore = inject(MercanStore);    
  mercanState = this.mercanStore.state;

  constructor(){  }

  ngOnInit(): void {
 
      // tenemos ahora un store que limpia el componente de funcionalidad...  
      this.mercanStore.getMercans();

  } 
}



