import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core'; 
import { ImageService } from '../../images.service';
import { BaseImage, Image } from '../../models/image.model';
import { TableListComponent } from '../../../../components/table-list/table-list.component';
 


@Component({
  selector: 'app-image-list',
  standalone: true,
  imports: [CommonModule,  TableListComponent],
  template: `


    <h4><span>Images List</span></h4> 
 
    <ng-container  >

        <app-table-list 
            [data]=images
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

  private questionService = inject(ImageService);
  
  msgLoad :string = "Cargando Lista Questions";
 
  // selectedItem: Question = this.questionService.questionEmpty;

    images: BaseImage[] = [
      { id: "1", desc:"pepe",  url:'http://localhost:3001/uploads/avatar.jpg', isActive:false },
      { id: "2", desc:"ssss",  url:'http://localhost:3001/uploads/avatar.jpg', isActive:true },
    ];

  // constructor(public qService: QuestionService) {}
 

  ngOnInit(): void {  
  
  }

  // Solo actualiza los que cambian
  trackById(index: number, question: any) {
    return question.id;
  }

  // de la tabla generica , OUTPUT
  onDelete(image:Image){
    console.log("iamgen a borrar", image)
    if(!image.id) return;
        
    if (confirm('¿Está usted seguro de borrar esta imagen?')) {
        this.msgLoad = "Deleting image";
        // this.imageStore.deleteImage(image.id);
    }    
  }
  
   
    
}