import { Component, EventEmitter, Input, Output } from '@angular/core'; 
import { Category } from '../../models/category.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul>
        <li *ngFor="let cat of categories; trackBy: trackById" 
              (click)="select(cat)"
              [class.selected]="cat===selected"
              >
          {{ cat.nombre }}
        </li> 
    </ul>  
  `
})
export class CategoryListComponent { 
   

  @Input() categories?: Category[] = [];

  @Output() selectCategory = new EventEmitter<Category>();

  selected?: Category;

  select(categoria: Category) {
    this.selectCategory.emit(categoria);
    this.selected = categoria;
  }

  // Solo actualiza los que cambian
  trackById(index: number, cat: any) {
    return cat.id;
  }

    
    
}

