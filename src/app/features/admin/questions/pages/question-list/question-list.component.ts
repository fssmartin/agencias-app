import { CommonModule } from '@angular/common';
import { Component } from '@angular/core'; 
// import { Question} from '../../models/questions.models';
import { AuthService } from '../../../../auth/auth.service';
import { RouterLink } from '@angular/router';
import { QuestionService } from '../../question.service';
import { Question } from '../../models/questions.model';
 


@Component({
  selector: 'app-question-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `


    <h4>Questions List</h4> 
 
    <ng-container  >

        <table
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
        </table>    
    </ng-container> 
    

  `
})
export class QuestionListComponent {  
  selected?: any;

    questions: Question[] = [
      { id: '1', descripcion: '¿Cuál es tu color favorito?', isActive: true, createdAt: new Date() },
      { id: '2', descripcion: '¿Cuál es tu comida favorita?', isActive: true, createdAt: new Date() },
      { id: '3', descripcion: '¿Cuál es tu película favorita?', isActive: false, createdAt: new Date() }
    ];

  // constructor(public qService: QuestionService) {}
 

  ngOnInit(): void {  
  
  }

  select(question: any) {
    this.selected = question;
  }

  // Solo actualiza los que cambian
  trackById(index: number, question: any) {
    return question.id;
  }

  deleteQuestion(question: any) {
    console.log("Pregunta a eliminar:", question.id);
     
  }
   
    
}