import { Component, OnInit } from '@angular/core';
import{Quizzes} from 'src/app/common/quizzes';
import { QuizzesService } from 'src/app/services/quizzes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes:Quizzes[]=[];
  constructor(private quizzesService:QuizzesService) { }

  ngOnInit(): void {
    this.quizzesService.getQuizzes().subscribe(
      (data:any)=>{
        this.quizzes=data;
        console.log(data);
        
      },
      (error)=>{
        console.log("error");
        Swal.fire('Error !','Error in loading data !','error');
      }
      
    );
  }

  deleteQuiz(id:any){
   
    
   Swal.fire({
     icon:'info',
     title:'Are you sure ?',
     confirmButtonText:'Delete',
     showCancelButton:true,
   }).then((result)=>{
     if(result.isConfirmed){
      this.quizzesService.deleteQuiz(id).subscribe(
        (data)=>{
  
          this.quizzes=this.quizzes.filter((quiz)=>quiz.qId!=id);
  
          Swal.fire("Success","Quiz deleted","success");
          
        },
        (error:any)=>{
          Swal.fire("Error","Error in deleting quiz","error");
          console.log(error);
          
        }
      );
     }
   })
    
  }
}
