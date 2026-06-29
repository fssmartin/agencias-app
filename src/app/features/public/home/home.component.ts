import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CategoryListComponent } from '../../../shared/components/category/categoty-list.component';
import { CategoryDetailComponent } from '../../../shared/components/category/category-detail.component';

import { Category } from '../../../shared/models/category.model'; 
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { AuthStore } from '../../auth/auth.store';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [CommonModule, CategoryDetailComponent, CategoryListComponent],
  template: `
    <div class="container">

      <div class="col" *ngIf="authStore.currentUser()"><p class="wellCome">Wellcome <strong>{{authStore.currentUser()?.name}}</strong>, ahora es tu turno</p></div>

      <div class="col col50"> 
        
        <app-category-list
            [categories]="categories"
            (selectCategory)="onSelectCategoria($event)">
        </app-category-list>
  
      </div>

      <div class="col col50">

        <app-category-detail 
            [category]="categoriaSeleccionada">
        </app-category-detail>

      </div>

    </div>  
  ` 
})
export class HomeComponent {

  categories: Category[] = [
    { id: 1, nombre: 'Cat 1' },
    { id: 2, nombre: 'Cat 2' },
    { id: 3, nombre: 'Cat 3' }
  ];

  categoriaSeleccionada?: Category ;


  constructor(public authStore:AuthStore ){ 

  } 

  ngOnInit(): void {  
      this.categoriaSeleccionada =  this.categories[0];
  }
    

  onSelectCategoria(categoria: Category ) {
    this.categoriaSeleccionada = categoria;
  }


    
}