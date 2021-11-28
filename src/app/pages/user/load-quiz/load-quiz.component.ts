import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quizzes } from 'src/app/common/quizzes';
import { QuizzesService } from 'src/app/services/quizzes.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  catId:any;
  quizzes:Quizzes[]=[];
  constructor(private _route:ActivatedRoute, private _quiz:QuizzesService) { }

  ngOnInit(): void {
    this._route.params.subscribe((params)=>{
     this.catId=params.catId;
     if(this.catId==0){
      console.log("load all the quiz");
 
      this._quiz.getActiveQuiz().subscribe(
        (data:any)=>{
         this.quizzes=data;
         console.log(this.quizzes);
          
        },
        (error:any)=>{
 
         console.log("error");
         alert("error in loading all quizzes");
         
        }
      );
      
    }else{
      console.log("load spec quiz");
      this.quizzes=[];
     
     this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe(
       (data:any)=>{
         
         this.quizzes=data;
         console.log(data);
       },
       (error:any)=>{

        alert("Error in loading Quiz data !!");
       }
     );
     
      
    }
     
   });


  }

}
