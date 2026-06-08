import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Signal } from '@angular/core';

@Component({
  selector: 'app-loading',
  styleUrls: ['./loading.component.css'],
  standalone: true,
  imports:[CommonModule],
  template: `
  <!-- <div class="spinner-container" *ngIf="loading()"> -->
  <div class="spinner-container">
    <div class="spinner"></div>
    <p>Loading users...</p>
</div>`
  
})
export class LoadingComponent {
  //@Input() loading!: Signal<boolean>;
}
