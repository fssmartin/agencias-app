import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Signal } from '@angular/core';
import { LoadingService } from '../../../../core/services/loading.service';

@Component({
  selector: 'app-loading',
  styleUrls: ['./loading.component.css'],
  standalone: true,
  imports:[CommonModule],
  template: `
  <!-- <div class="spinner-container" *ngIf="loading()"> -->
    
  <div *ngIf="ui.loading()">
    <div class="spinner-container">
         <div class="spinner"></div>
         <!-- <p>{{texto}}...</p> -->
    </div>
  </div>`

  
})
export class LoadingComponent {
  //@Input() loading!: Signal<boolean>;
  @Input() texto:string="";
  
  constructor(
      public ui: LoadingService
    ) {}

}