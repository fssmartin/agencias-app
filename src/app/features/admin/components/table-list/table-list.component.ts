import { CommonModule } from '@angular/common';
import { Component, computed, effect, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { output } from '@angular/core';

@Component({
  selector: 'app-table-list',
  standalone: true,
  imports: [CommonModule, RouterLink ],
  template: `

<!-- <pre>--- {{ tableConfig()  | json }} -----</pre> -->
<!-- <pre>{{fieldOrder()|json}}</pre>

<pre>{{direcOrder()|json}}</pre> -->

    <p class="addItem">
      <button  [routerLink]="['create']"
                class="fRight btEnlace btCrear">{{  tableConfig().lbCreation }}</button>                
                <!-- class="fRight btEnlace btCrear">{{  lbCreation() }}</button> -->
    </p>

    <div class="table-container">
      <table class="listTable">
            <thead>
              <tr>
                <th *ngFor="let col of tableConfig().columns" (click)="lanzarEmit(col.key[0] , col.order)"
                  [ngClass]="[col.type, !col.order ? 'noOrder':'', col.class ? col.class:'' ]"   >

                  {{ col.label }}

                  @if (col.order) {
                      @if (fieldOrder() == col.key[0]) {
                        <span >
                          {{  direcOrder() == 'desc' ? '▲' : '▼' }}
                        </span>
                      } @else {
                        <span>↕</span>
                      }
                  } 

                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>

              <tr *ngFor="let item of dataShow(); trackBy: trackById"
                  [ngClass]="{ 'highlight-row': item.id == itemSelected()}"
              >
    
                <td *ngFor="let col of tableConfig().columns" [ngClass]="col.type">
    
                    <ng-container [ngSwitch]="col.type">
    
                      <!-- Boolean -->
                      <div *ngSwitchCase="'boolean'">{{ item[col.key[0]] ? '✅' : '❌' }}</div>
                      <!-- Rol -->
                      <div *ngSwitchCase="'role'">{{ item[col.key[0]] === 'ADMIN' ? '🛡️' : item[col.key[0]] === 'MANAGER' ? '📊' : '👤'  }}</div>
                      <!-- Fecha -->
                      <div *ngSwitchCase="'date'">{{ item[col.key[0]] | date:'dd/MM/yyyy HH:MM' }}</div>
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
                  <div>
                                <!-- [queryParams]="{ 'mode': 'view' }"  -->
                      <button  [routerLink]="[item.id]" title="Show">
                                <!-- <i class="fa-solid fa-eye"></i> -->
                                <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      </button>
                                <!-- [queryParams]="{ 'mode': 'edit' }"  -->
                      <button  [routerLink]="[item.id, 'edit']" title="Edit">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-3"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                                <!-- <i class="fa-solid fa-pencil"></i> -->
                      </button>
                      <button title="Delete" (click)="delete.emit(item.id)">
                                <!-- <i class="fa-regular fa-trash-can"></i> -->
                              <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>                          
                      </button>
                  </div>
                </td>
              </tr>
            </tbody>
        </table>          
      <!-- PAGINATION -->
      
    </div>
      @if (tableConfig().pagination) {     
        <div class="sectionPagination">
            <p class="total">
                      @if (tableConfig().pagination.total) {
                        <span>Total: <strong>{{ totRegSelected() }} / {{totReg()}}</strong></span>
                        @if (totPag().length > 1) {                        
                          <span>Pag. {{pagSelected()}} of {{pagTotales()}}</span>
                        }
                      }
                      @if (tableConfig().pagination.perpage) {
                        <span>Item per page
                          <select name="numPag" id="numPag" (change)="changeReXpag($event)">">
                              <option [value]=1 [selected]="reXpag() === 1">1 </option>
                              <option [value]=2 [selected]="reXpag() === 2">2 </option>
                              <option [value]=5 [selected]="reXpag() === 5">5 </option>
                              <option [value]=10 [selected]="reXpag() === 10">10 </option>
                          </select>
                          <!-- <span>ir a<input type="text" name="ira" id="ira" placeholder="0" value="0"/></span> -->
                        </span>
                      }  
            </p>
          @if (tableConfig().pagination.toPagination && totPag().length > 1) {  

            <p class="pagination">
                    
                      @if ( pagSelected() - 1 > 1 ) {
                          <a href="#ni" (click)="gotoPage(1)" >|<</a>                    
                      }    
                      @if ( pagSelected()  > 1 ) {
                          <a href="#ni" (click)="gotoPage(pagSelected()-1)" ><</a>                    
                      }  

                      <ng-container *ngFor="let pag of totPag()" >                      
                        <a href="#ni" (click)="gotoPage(pag)"  [ngClass]="{ 'active': pag == pagSelected()}">{{pag}}</a>
                      </ng-container> 

                      @if ( pagSelected() < totPag().length ) {
                          <a href="#ni" (click)="gotoPage(pagSelected()+1)">></a>
                      }    
                      @if ( pagSelected() + 1 < totPag().length ) {
                          <a href="#ni" (click)="gotoPage(totPag().length )">>|</a>                    
                      }  
            </p>
          }   
        </div>             
      } 
  `
})

export class TableListComponent {
  
  fieldOrder = input<string>(); // ✅ signal-based input
  direcOrder = input<string>(); // ✅ signal-based input
  data = input<any[]>(); // ✅ signal-based input
  itemSelected= input<string>(); // ✅ signal-based input

  // columns = input<{ key: string[],
  //                   label: string,
  //                   type?: 'email' | 'text' | 'date' | 'boolean' | 'icon'| 'role',
  //                   order: boolean,
  //                   class?:string
  //                 }[]>([]);
  // lbCreation  = input< string>("Crear Item");

  tableConfig = input<any>({});

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