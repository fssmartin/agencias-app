import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, Input, Signal } from '@angular/core'; 
import { NotificationUiService } from '../../../../core/services/notificactions.service';

@Component({
  selector: 'app-scroll-top',
  standalone: true,
  imports: [CommonModule],  
  styleUrl:'scroll-top.component.css',
  template:`
        @if (isVisible) {
            <button
                class="scroll-top-btn"
                (click)="scrollToTop()"
                aria-label="Volver arriba">
                ↑
            </button>
        }
`
})
export class ScrollTopComponent {   
    

  isVisible = true;

  @HostListener('window:scroll')
  onWindowScroll(): void {
    console.log("window.scrollY______, ",window.scrollY)
    this.isVisible = window.scrollY > 100;
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

}
