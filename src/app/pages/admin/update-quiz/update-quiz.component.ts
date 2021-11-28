import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categories } from 'src/app/common/categories';
import { Quizzes } from 'src/app/common/quizzes';
import { CategoryService } from 'src/app/services/category.service';
import { QuizzesService } from 'src/app/services/quizzes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  constructor(private _route:ActivatedRoute, 
    private quizzesService:QuizzesService, 
    private categoryService:CategoryService,
    private _router:Router
    ) { }

  quizId=0;
  quizUpated:Quizzes=new Quizzes();
  categories:Categories[]=[];

  ngOnInit(): void {
  
    this.quizId=this._route.snapshot.params.qId;
  
  this.quizzesService.getQuizById(this.quizId).subscribe(
    (data:any)=>{
      this.quizUpated=data;

    },
    (error)=>{
      console.log("error");
      
    }
  );

  this.categoryService.categories().subscribe(
    (data:any)=>{
      this.categories=data;
    },
    (error)=>{
      console.log("Error");
      
    }
  );
  }
onSubmit(){
  console.log(this.quizUpated);
  
  this.quizzesService.updateQuiz(this.quizUpated).subscribe(
    (data)=>{
      Swal.fire("Success !!", "quiz updated","success").then((e)=>{
        this._router.navigate(["/admin/quizzes"]);
      });
      console.log("updated");
      
    },
    (error)=>{
      Swal.fire('Error','error in updating quiz',"error");
    }
  );

}
}
