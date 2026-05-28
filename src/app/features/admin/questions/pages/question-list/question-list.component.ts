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

    <button routerLink="/admin/questions/create" class="fRight">Crear Question</button>

    <table>
      <tr>
        <th>Id</th>
        <th>Descripcion</th>
        <th></th>
      </tr>
      <tr *ngFor="let question of questions; trackBy: trackById">
        <td>{{ question.id }}</td>
        <td>{{ question.descripcion }}</td>
      </tr>
      <tr *ngIf="questions.length === 0">
        <td colspan="4" align="center" class="notFound">No questions</td>
      </tr>
    </table>
    

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
    this.questions = this.questions.filter(q => q.id !== question.id);
  }
   
    
}