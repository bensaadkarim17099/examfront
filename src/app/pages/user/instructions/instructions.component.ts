import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Quizzes } from 'src/app/common/quizzes';
import { QuizzesService } from 'src/app/services/quizzes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  qid:any; 
  quiz:Quizzes=new Quizzes();

  constructor(private _route:ActivatedRoute,private _quiz:QuizzesService, private _router:Router) { }

  ngOnInit(): void {
  this.qid=this._route.snapshot.params.qid;
  //console.log(this.qid);
  this._quiz.getQuizById(this.qid).subscribe(
    (data:any)=>{
      console.log(data);
      this.quiz=data;

    },
    (erro)=>{
      console.log("Error");
      alert("Error in loading Quiz data !");
      
    }
  );

  }

  startQuiz(){

    Swal.fire({
      title: 'Do you want to start the quiz?',
      showCancelButton: true,
      confirmButtonText: `Start`,
      denyButtonText: `Don't save`,
      icon:'info',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._router.navigate(['/start/'+this.qid]);
      } 
    })
  }

}


