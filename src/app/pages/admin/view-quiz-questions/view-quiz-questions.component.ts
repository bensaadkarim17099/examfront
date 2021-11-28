import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {QuestionService} from 'src/app/services/question.service';
import{Questions} from 'src/app/common/questions';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  quizId:any;
  quizTitle:any; 
  questions:Questions[]=[];
 
  constructor(private _route:ActivatedRoute, private _question:QuestionService,private _snak:MatSnackBar) { }

  ngOnInit(): void {
    this.quizId=this._route.snapshot.params.id;
    this.quizTitle=this._route.snapshot.params.title;
    this._question.getQuestionOfQuiz(this.quizId).subscribe(
      (data:any)=>{
        console.log(data);
        this.questions=data;
       
      },
      (error)=>{
        console.log("error");
        
      }
    );
    
    
  }
  deleteQuestion(quesId:any){
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:"Delete",
      title:"Are you sure , want to delete this question ? "
    }).then((result)=>{
      if(result.isConfirmed){
      this._question.deletQuestionOfQuiz(quesId).subscribe(
        (data:any)=>{
          this.questions=this.questions.filter((q)=>{q.quesId!=quesId});
          Swal.fire("Success","Question deleted","success");
          
          console.log("Succ");
          
        },
        (error)=>{
          this._snak.open('Error in deleting question','',{duration:3000});
          console.log(("Error"));
          
        }
      );
      }

    });
   
   
  }
}
