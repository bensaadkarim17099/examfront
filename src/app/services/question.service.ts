import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }

  public getQuestionOfQuiz(qid:any){
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }



  public getQuestionOfQuizForTest(qid:any){
    return this._http.get(`${baseUrl}/question/quiz/${qid}`);
  }



  public addQuestionOfQuiz(question:any){
    return this._http.post(`${baseUrl}/question/`,question);
  }

  public deletQuestionOfQuiz(quesId:any){
    return this._http.delete(`${baseUrl}/question/${quesId}`);
  }

  //eval quiz
  public evalQuiz(questions:any){
    return this._http.post(`${baseUrl}/question/eval-quiz`,questions);
  }
}
