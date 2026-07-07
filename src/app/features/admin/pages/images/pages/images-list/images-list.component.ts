import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core'; 
import { BaseImage, Image } from '../../models/image.model';
import { TableListComponent } from '../../../../components/table-list/table-list.component';
import { ImageStore } from '../../image.store';
import { LoadingComponent } from '../../../../../../shared/components/ui/loading/loading.component';
import { NotificationsComponent } from '../../../../../../shared/components/ui/notifications/notifications.component';
 


@Component({
  selector: 'app-image-list',
  standalone: true,
  imports: [CommonModule,  LoadingComponent, NotificationsComponent, TableListComponent],
  template: `

    <h4 *ngIf="!imageState()?.loading">
       <span>Image List</span>
       <app-notifications></app-notifications>
    </h4> 

    <!-- <app-loading *ngIf="loading$ | async"></app-loading> -->
    <app-loading  [texto]="msgLoad" *ngIf="imageState()?.loading"></app-loading>
 
    <!-- <ng-container *ngIf="!(loading$ | async)"> -->
    <ng-container  *ngIf="!imageState()?.loading">

        <app-table-list 
            [data]=imageState().data!
            [columns]="[
              { key: ['isActive'], label: '', type:'boolean' , order:false },
              { key: ['desc'],     label: 'Descripcion', type:'text' , order:true },
              { key: ['url'],      label: 'Url', type:'text' , order:false },
            ]"
            [lbCreation] = "'Images'"
        ></app-table-list>
 
    </ng-container> 
    

  `
})
export class ImageListComponent {  

  private imageStore = inject(ImageStore);
  
  imageState = this.imageStore.state;
  msgLoad :string = "Cargando Lista Imagenes";

  private timeoutId: any;

  constructor(
    // public authService:AuthService 
  ){    

    effect(()=>{
          const error     = this.imageState().error;
          const imageSelected = this.imageState().selectedItem;

          console.log("EFFECT ---- userSelec, ",imageSelected)

          if(!imageSelected) return;
            
          clearTimeout(this.timeoutId);

          this.timeoutId = setTimeout(() => {
            console.log("________________________________________ setTimeout LISTADO")
            this.imageStore.cleanMsgState(false);
            this.msgLoad = 'Cargando Lista Usuarios'
          }, 3000);
          
    })

  }


  ngOnInit(): void {  
      // tenemos ahora un store que limpia el componente de funcionalidad...  
      this.imageStore.getImages();
  }

  // Solo actualiza los que cambian
  trackById(index: number, question: any) {
    return question.id;
  }
 
   
    
}