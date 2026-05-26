import { Component, Input } from '@angular/core'; 
import { Category } from '../../models/category.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <table>
      <tr>
        <td>{{category?.id}}</td>
        <td>{{category?.nombre}}</td>
      </tr>
    </table> 
  `
})
export class CategoryDetailComponent { 
   
  @Input() category?:Category;
    
    
}

