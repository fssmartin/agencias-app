import { Component} from '@angular/core';  
import { UiService } from '../../../core/services/ui.service';



@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <div class="container">
        <div class="col">
          <h3>About</h3>
            <p>This is the about page of the application.</p>   
        </div>
    </div>     
  `
})
export class AboutComponent {  


  constructor(private ui:UiService){  }

 
  ngOninit(){
    console.log("hola ??")
    this.ui.showLoading();
  }
  


}



