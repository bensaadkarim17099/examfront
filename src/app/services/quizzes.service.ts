import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';
import { Quizzes } from '../common/quizzes';

@Injectable({
  providedIn: 'root'
})
export class QuizzesService {

  constructor(private _http:HttpClient) { }

  public getQuizzes(){
    return this._http.get(`${baseUrl}/quiz/`);
  }

  public addQuiz(quiz:any){
    return this._http.post(`${baseUrl}/quiz/`,quiz);
  }

  public deleteQuiz(id:any){
    return this._http.delete(`${baseUrl}/quiz/${id}`);
  }

  public getQuizById(id:any){
    return this._http.get(`${baseUrl}/quiz/${id}`);
  }

  public updateQuiz(quiz:any){
    return this._http.put(`${baseUrl}/quiz/`,quiz);
  }

  public getQuizByCatId(id:any){
    return this._http.get(`${baseUrl}/quiz/category/${id}`);
  }


  public getActiveQuiz(){
    return this._http.get(`${baseUrl}/quiz/active`);
  }

  public getActiveQuizzesOfCategory(cid:any){
    return this._http.get(`${baseUrl}/quiz/category/active/${cid}`);
  }
}
