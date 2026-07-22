import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core'; 
import { QuestionService } from '../../question.service';
import { Question } from '../../models/questions.model';
import { TableListComponent } from '../../../../components/table-list/table-list.component';
 


@Component({
  selector: 'app-question-list',
  standalone: true,
  imports: [CommonModule],
  template: `


    <h4><span>Questions List</span></h4> 
 
    <ng-container  >
 
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