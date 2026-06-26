import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { output } from '@angular/core';

@Component({
  selector: 'app-table-list',
  standalone: true,
  imports: [CommonModule, RouterLink ],
  template: ` 

<!-- <pre>{{itemSelected()|json}}</pre>  -->

    <table 
          class="listTable">
          <tr>
            <th *ngFor="let col of columns()" (click)="sort.emit(col.key[0])">
              {{ col.label }}
              <span *ngIf="fieldOrder()  === col.key[0] ">
                {{  direcOrder() === 'asc' ? '▲' : '▼' }}
              </span>
            </th>
            <th>
              <!-- <button routerLink="edit"
                      [queryParams]="{ mode: 'create' }"  -->
                <button  [routerLink]="['create']"
                  class="fRight btEnlace btCrear">{{ crear() }}</button>
            </th>
          </tr>
          <tr *ngFor="let item of data(); trackBy: trackById"        
              [ngClass]="{ 'highlight-row': item.id == itemSelected()!}" 
          >

            <td *ngFor="let col of columns()" [ngClass]="col.type">

                <ng-container [ngSwitch]="col.type">

                  <!-- Boolean -->
                  <span *ngSwitchCase="'boolean'">{{ item[col.key[0]] ? '✅' : '❌' }}</span>
                  <!-- Rol -->
                  <span *ngSwitchCase="'role'">{{ item[col.key[0]] === 'ADMIN' ? '🛡️' : item[col.key[0]] === 'MANAGER' ? '📊' : '👤'  }}</span>
                  <!-- Fecha -->
                  <span *ngSwitchCase="'date'">{{ item[col.key[0]] | date:'dd/MM/yyyy:HH:MM' }}</span>
                  <!-- Gender -->
                  <!-- <span *ngSwitchCase="'icon'">
                        <i [ngClass]="item[col.key[0]].toLocaleUpperCase() === 'MALE'
                            ? 'fa-solid fa-mars'
                            : 'fa-solid fa-venus'">
                        </i>
                  </span> -->



                  <!-- Default -->
                  <span *ngSwitchDefault>
                    <!-- {{ item[col.key] }} -->
                      <span *ngFor="let key of col.key">
                            {{ item[key] }}
                      </span>
                  </span>

                </ng-container>

            </td>
            <td>
                       <!-- [queryParams]="{ 'mode': 'view' }"  -->
              <button  [routerLink]="[item.id]"
                       title="Show">
                       <i class="fa-solid fa-eye"></i></button>
                       <!-- [queryParams]="{ 'mode': 'edit' }"  -->
              <button  [routerLink]="[item.id, 'edit']"
                       title="Edit">
                       <i class="fa-solid fa-pencil"></i></button>
              <button title="Delete" (click)="delete.emit(item.id)">
                       <i class="fa-regular fa-trash-can"></i></button>
            </td>
          </tr>
          <tr>
            <td></td>
            <td  colspan="24" text-align="right">Total: <strong>{{data()?.length}}</strong></td>
          </tr>
    </table> 
  `
})
export class TableListComponent {
  fieldOrder = input<string>(); // ✅ signal-based input
  direcOrder = input<string>(); // ✅ signal-based input
  data = input<any[]>(); // ✅ signal-based input
  itemSelected= input<string>(); // ✅ signal-based input
  columns = input<{ key: string[],
                    label: string,
                    type?: 'text' | 'date' | 'boolean' | 'icon'| 'role'
                  }[]>([]);
  crear  = input< string>("Crear Item");
  delete = output<any>();
  sort   = output<any>();

  // deleteUser(id: string) {
  //     if(!id) return;          
  //     if (confirm('¿Está usted seguro de borrar este usuario?')) {
  //         this.msgLoad = "Deleting User"
  //         this.userStore.deleteUser(id);
  //     } 
  // } 



    //Solo actualiza los que cambian
  trackById(index: number, item: any) {
    return item.id || index;
  }
}