import { Component, EventEmitter, Input, Output } from '@angular/core'; 
import { Agencia } from '../../shared/models/agencia.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-agencia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-agencia.component.html',
  styleUrl: './list-agencia.component.css'
})
export class ListAgenciaComponent { 
   

  @Input() agencias: Agencia[] = [];

  @Output() selectAgencia = new EventEmitter<Agencia>();

  select(agencia: Agencia) {
    this.selectAgencia.emit(agencia);
  }

    
    
}

