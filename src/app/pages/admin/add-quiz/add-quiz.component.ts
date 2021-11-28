import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Categories } from 'src/app/common/categories';
import { Quizzes } from 'src/app/common/quizzes';
import { CategoryService } from 'src/app/services/category.service';
import { QuizzesService } from 'src/app/services/quizzes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  categories:Categories[]=[];
  quizzes:Quizzes=new Quizzes();

  constructor(private quizService:QuizzesService ,private categoryService:CategoryService, private _snack:MatSnackBar) { }

  ngOnInit(): void {
    this.categoryService.categories().subscribe(
      (data:any)=>{
        this.categories=data;
        console.log(data);
        
      },
      (error)=>{
        Swal.fire('Error','error in loading data from server','error');
      }
    );
  }

  onSubmit(){
    if(  this.quizzes.title==null || this.quizzes.title.trim()=='' ){
      this._snack.open("Title Required !!","",{duration:3000});
      return;

    }
    this.quizService.addQuiz(this.quizzes).subscribe(
      (data:any)=>{
        console.log("succ");
        Swal.fire('Success','Quiz is added','success');
        this.quizzes=new Quizzes();
      },
      (error)=>{
        Swal.fire('Error','Error while adding quiz','error');
      }
    );



  }
}
