import { Component} from '@angular/core';   

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


  constructor( ){  }

 
  ngOninit(){
    console.log("hola ??") 
  }
  


}



