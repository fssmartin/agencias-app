import { CommonModule } from '@angular/common';
import { Component, computed, effect, input, signal } from '@angular/core';
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
            <th *ngFor="let col of columns()" (click)="lanzarEmit(col.key[0] , col.order)"
              [ngClass]="{ 'noOrder': !col.order}">
              {{ col.label }}
              <span *ngIf="fieldOrder() == col.key[0] && col.order ">
                {{  direcOrder() == 'desc' ? '▲' : '▼' }}
              </span>
            </th>
            <th>
              <!-- <button routerLink="edit"
                      [queryParams]="{ mode: 'create' }"  -->
                <button  [routerLink]="['create']"
                  class="fRight btEnlace btCrear">{{ lbCreation() }}</button>
            </th>
          </tr>
          <tr *ngFor="let item of dataShow(); trackBy: trackById"
              [ngClass]="{ 'highlight-row': item.id == itemSelected()}"
          >

            <td *ngFor="let col of columns()" [ngClass]="col.type">

                <ng-container [ngSwitch]="col.type">

                  <!-- Boolean -->
                  <div *ngSwitchCase="'boolean'">{{ item[col.key[0]] ? '✅' : '❌' }}</div>
                  <!-- Rol -->
                  <div *ngSwitchCase="'role'">{{ item[col.key[0]] === 'ADMIN' ? '🛡️' : item[col.key[0]] === 'MANAGER' ? '📊' : '👤'  }}</div>
                  <!-- Fecha -->
                  <div *ngSwitchCase="'date'">{{ item[col.key[0]] | date:'dd/MM/yyyy:HH:MM' }}</div>
                  <!-- Gender -->
                  <!-- <span *ngSwitchCase="'icon'">
                        <i [ngClass]="item[col.key[0]].toLocaleUpperCase() === 'MALE'
                            ? 'fa-solid fa-mars'
                            : 'fa-solid fa-venus'">
                        </i>
                  </span> -->

                  <!-- Default -->
                  <ng-container *ngSwitchDefault>
                    <!-- {{ item[col.key] }} -->
                      <div *ngFor="let key of col.key">
                            {{ item[key] }}
                      </div>
                  </ng-container>

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

    <!-- PAGINATION -->

          <tr class="total">
            <td colspan="100">
                <p>
                  <span>Total: <strong>{{ totRegSelected() }} /{{totReg()}}</strong></span>
                  <span>Pag. {{pagSelected()}} / {{pagTotales()}}</span>
                  <span>
                    <select name="numPag" id="numPag" (change)="changeReXpag($event)">">
                      <option [value]=1 [selected]="reXpag() === 1">1/pag </option>
                      <option [value]=2 [selected]="reXpag() === 2">2/pag </option>
                      <option [value]=5 [selected]="reXpag() === 5">5/pag </option>
                    </select>
                    <!-- <span>ir a<input type="text" name="ira" id="ira" placeholder="0" value="0"/></span> -->
                  </span>
                </p>
            </td>
          </tr>
          <tr class="pagination">
            <td colspan="100">Pagination: 
              <ng-container *ngFor="let pag of totPag()" >
                <a href="#ni" (click)="gotoPage(pag)"  [ngClass]="{ 'active': pag == pagSelected()}">{{pag}}</a>
              </ng-container> 
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
                    type?: 'text' | 'date' | 'boolean' | 'icon'| 'role',
                    order: boolean
                  }[]>([]);
  lbCreation  = input< string>("Crear Item");


  //PAGINATION 
        _pagination =  signal<any>({
            pagSelected : 1 ,
            reXpag : 5,
            data : this.data() || []
        });

        pagSelected =  computed(() => this._pagination().pagSelected );
        reXpag      =  computed(() => this._pagination().reXpag );
        totReg      =  computed(() => {return this._pagination().data.length});
        totPag      =  computed(() => {
          return  Array.from({length: this.calcTotPag() }, (_, i) => i + 1)
        });
        totRegSelected =  computed(() =>  this.dataShow().length);
        pagTotales =  computed(() => this.totPag()?.length);
        dataShow   = computed(() => {
            const data = this._pagination().data ?? [];
            const page = this.pagSelected();
            const perPage = this.reXpag();

            const start = (page - 1) * perPage;
            const end = start + perPage;

            return data.slice(start, end);
        });
// fin PAGINATION

  delete = output<string>();
  sort   = output<any>();

  // deleteUser(id: string) {
  //     if(!id) return;
  //     if (confirm('¿Está usted seguro de borrar este usuario?')) {
  //         this.msgLoad = "Deleting User"
  //         this.userStore.deleteUser(id);
  //     }
  // }

  constructor(    
  ){    
      // cuando ordeno no se entera si no hago el
      effect(()=>{
          this._pagination.update(s=> ({...s, data:this.data(), pagSelected: 1 }))
      })
  }

    
  ngOnInit(){
      this._pagination.update(s=> ({...s, data:this.data()}))
  }

  calcTotPag(){
      let divi = this.totReg()! / this.reXpag()!;
      let mod  = this.totReg()! % this.reXpag()!;     
      return  Math.floor(divi) > 0 ? Math.floor(divi) + Math.floor(mod) : 1 ;
  }

  changeReXpag(event: Event) {
      const value = (event.target as HTMLSelectElement).value;
      this._pagination.update(s => ({
        ...s,
        reXpag: Number(value),
        pagSelected: 1 // reset a primera página
      }));
      return false;
  }

  gotoPage(page:number){
      this._pagination.update(s=> ({...s, pagSelected: page}))
      return false;
  }

  lanzarEmit(registro:string, isOrder:boolean){ 
      if(!isOrder) return;
        this.sort.emit(registro);
  }

    //Solo actualiza los que cambian
  trackById(index: number, item: any) {
        return item.id || index;
  }
}