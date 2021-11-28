import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Questions } from 'src/app/common/questions';
import { Quizzes } from 'src/app/common/quizzes';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  quizId!:String;
  quizTitle!:String;
  quiz:Quizzes[]=[];
  question:Questions=new Questions();


  constructor( private _router:ActivatedRoute, private questionService:QuestionService) { }

  ngOnInit(): void {
    this.quizId=this._router.snapshot.params.qid;
    this.quizTitle=this._router.snapshot.params.title;
   console.log(this.quizId);
   this.question.quiz=new Quizzes();
   this.question.quiz.qId=this.quizId;
   
  
    
  }
  addQuestion(){
    console.log(this.question);
    if(this.question.content.trim()=='' || this.question.content==null){
      return;
    }

    if(this.question.option1.trim()=='' || this.question.option1==null){
      return;
    }
    if(this.question.option2.trim()=='' || this.question.option2==null){
      return;
    }
    if(this.question.answer.trim()=='' || this.question.answer==null){
      return;
    }


    this.questionService.addQuestionOfQuiz(this.question).subscribe(
      (data:any)=>{
        Swal.fire("Success","Question Added","success")
       // this.question=new Questions();

        console.log("Success");
      },(error)=>{
        Swal.fire("Error","Error in adding question","error");
      }
    );

    
  }
}
