import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core'; 
import { QuestionService } from '../../question.service';
import { Question } from '../../models/questions.model';
import { TableListComponent } from '../../../../components/table-list/table-list.component';
 


@Component({
  selector: 'app-question-list',
  standalone: true,
  imports: [CommonModule,  TableListComponent],
  template: `


    <h4><span>Questions List</span></h4> 
 
    <ng-container  >

        <app-table-list 
            [data]=questions
            [columns]="[
              { key: ['descripcion'], label: 'Descripcion', type:'text' , order:true },
              { key: ['createdAt'], label: 'CreatedAt', type:'date'  , order:false}
            ]"
            [lbCreation] = "'Question'"
        ></app-table-list>

        <!-- <table
          *ngIf="questions"
          class="listTable">
          <tr>
            <th></th>
            <th>Name</th>
            <th><button routerLink="/admin/question/create"  class="fRight btEnlace btCrear">Crear Question</button></th>
          </tr>
          <tr *ngFor="let question of questions; trackBy: trackById">
            <td>{{ question.isActive ? '✅' : '❌' }}</td>
            <td>{{ question.descripcion | slice:0:15 }} {{ question.descripcion.length > 15 ? '...' : '' }}</td>
            <td>
              <button [routerLink]="['/admin/users/edit', question.id]"
                [queryParams]="{ mode: 'view' }" title="Show" >  👁️</button>
              <button [routerLink]="['/admin/users/edit', question.id]" 
                [queryParams]="{ mode: 'edit' }" title="Edit">✏️</button>
              <button (click)="deleteQuestion(question)"  class="" >🗑️</button>
            </td>
          </tr>
          <tr *ngIf="questions.length > 0; else noUsers">
            <td></td>
            <td  colspan="4" text-align="right">Total: <strong>{{ questions.length }}</strong></td>
          </tr>
          <ng-template #noUsers>
            <tr>
              <td colspan="5" class="notFound" style="text-align: center;">
                No users
              </td>
            </tr>
          </ng-template>
        </table>   -->

    </ng-container> 
    

  `
})
export class QuestionListComponent {  

  private questionService = inject(QuestionService);
  // public questionStore = inject(QuestionStore);

  // userState = this.questionStore.state;
  
  msgLoad :string = "Cargando Lista Questions";
 
  // selectedItem: Question = this.questionService.questionEmpty;

    questions: Question[] = [
      { id: '1', descripcion: '¿Cuál es tu color favorito?', isActive: true, createdAt: new Date() },
      { id: '2', descripcion: '¿Cuál es tu comida favorita?', isActive: true, createdAt: new Date() },
      { id: '3', descripcion: '¿Cuál es tu película favorita?', isActive: false, createdAt: new Date() },
      { id: '4', descripcion: 'zzz z zz z zzz z zz?', isActive: true, createdAt: new Date() },
      { id: '5', descripcion: '¿yyyyyyyy asd asd asd ?', isActive: false, createdAt: new Date() },
      { id: '6', descripcion: '¿xxxxxxxxxxxxxxxxxx?', isActive: true, createdAt: new Date() }
    ];

  // constructor(public qService: QuestionService) {}
 

  ngOnInit(): void {  
  
  }
 

  // Solo actualiza los que cambian
  trackById(index: number, question: any) {
    return question.id;
  }

  // de la tabla generica , OUTPUT
  onDelete(question:Question){
    console.log("question a borrar", question)
    if(!question.id) return;
        
    if (confirm('¿Está usted seguro de borrar esta question?')) {
        this.msgLoad = "Deleting question";
        // this.questionStore.deleteUser(question.id);
    }    
  }
  
   
    
}