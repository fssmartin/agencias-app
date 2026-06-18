import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { User } from '../../../../core/models/users.models';
import { RouterLink } from '@angular/router';
import { output } from '@angular/core';

@Component({
  selector: 'app-table-list',
  standalone: true,
  imports: [CommonModule, RouterLink ],
  template: ` 

<!-- <pre>{{fieldOrder()|json}}</pre>
<pre>{{direcOrder()|json}}</pre> -->

    <table 
          class="listTable">
          <tr>
            <th *ngFor="let col of columns()" (click)="sort.emit(col.key)">
              {{ col.label }}
              <span *ngIf="fieldOrder()  === col.key ">
                {{  direcOrder() === 'asc' ? '▲' : '▼' }}
              </span>
            </th>
            <th>
                <button class="fRight btEnlace btCrear">{{ crear() }}</button>
            </th>
          </tr>
          <tr *ngFor="let item of data(); trackBy: trackById">

            <td *ngFor="let col of columns()" [ngClass]="col.type">

                <ng-container [ngSwitch]="col.type">

                  <!-- Rol -->
                  <span *ngSwitchCase="'role'">{{ item[col.key] === 'ADMIN' ? '🛡️' : item[col.key] === 'MANAGER' ? '📊' : '👤'  }}</span>
                  <!-- Fecha -->
                  <span *ngSwitchCase="'date'">{{ item[col.key] | date:'dd/MM/yyyy:HH:MM' }}</span>
                  <!-- Boolean -->
                  <span *ngSwitchCase="'boolean'">{{ item[col.key] ? '✅' : '❌' }}</span>

                  <!-- Default -->
                  <span *ngSwitchDefault>
                    {{ item[col.key] }}
                  </span>

                </ng-container>

            </td>
            <td>
              <button [routerLink]="['edit', item.id]"
                      [queryParams]="{ mode: 'view' }" title="Show">
                      <i class="fa-solid fa-eye"></i></button>
              <button [routerLink]="['edit', item.id]" 
                       [queryParams]="{ mode: 'edit' }" title="Edit">
                       <i class="fa-solid fa-pencil"></i></button>
              <button title="Delete" (click)="delete.emit(item)"
                      ><i class="fa-regular fa-trash-can"></i></button>
            </td>
          </tr>
          <tr>
            <td></td>
            <td  colspan="4" text-align="right">Total: <strong>{{data()?.length}}</strong></td>
          </tr>
    </table> 
  `
})
export class TableListComponent {
  fieldOrder = input<string>(); // ✅ signal-based input
  direcOrder = input<string>(); // ✅ signal-based input
  data = input<any[]>(); // ✅ signal-based input
  columns = input<{ key: string; 
                    label: string;
                    type?: 'text' | 'date' | 'boolean' | 'icon'| 'role';}[]>([]);
  crear  = input< string>("Crear Item");
  delete = output<any>();
  sort   = output<any>();

  // deleteUser(user: User) {
  //     if(!user.id) return;          
  //     if (confirm('¿Está usted seguro de borrar este usuario?')) {
  //         this.msgLoad = "Deleting User"
  //         this.userStore.deleteUser(user.id);
  //     }

  // } 



    //Solo actualiza los que cambian
  trackById(index: number, item: any) {
    return item.id || index;
  }
}