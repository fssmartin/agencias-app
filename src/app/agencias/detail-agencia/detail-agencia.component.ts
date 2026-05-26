import { Component, Input } from '@angular/core'; 
import { Agencia } from '../../shared/models/agencia.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-agencia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-agencia.component.html' 
})
export class DetailAgenciaComponent { 
   
  @Input() agencia?: Agencia;
    
    
}

