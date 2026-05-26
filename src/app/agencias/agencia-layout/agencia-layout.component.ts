import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DetailAgenciaComponent } from '../detail-agencia/detail-agencia.component';
import { ListAgenciaComponent } from '../list-agencia/list-agencia.component';
import { Agencia } from '../../shared/models/agencia.model';
import { CommonModule } from '@angular/common';





@Component({
  selector: 'app-agencia-layout',
  standalone: true,
  imports: [CommonModule, DetailAgenciaComponent, ListAgenciaComponent],
  templateUrl: './agencia-layout.component.html' ,
  styleUrls: ['./agencia-layout.component.css'] ,
})
export class AgenciaLayoutComponent {  
 

  agencias: Agencia[] = [
    { id: 1, nombre: 'Agencia Madrid', direccion: 'Gran Vía 1' },
    { id: 2, nombre: 'Agencia Barcelona', direccion: 'Diagonal 123' },
    { id: 3, nombre: 'Agencia Valencia', direccion: 'Colón 45' }
  ];

  agenciaSeleccionada?: Agencia ;

  constructor( ){ 

  } 

  ngOnInit(): void {  
      this.agenciaSeleccionada =  this.agencias[0];
  }
    

  onSelectAgencia(agencia: Agencia) {
    this.agenciaSeleccionada = agencia;
  }


    
}