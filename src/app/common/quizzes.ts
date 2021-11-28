import { Categories } from "./categories";

export class Quizzes {
    qId!:String;
    title!: String;
    description!:String;
    maxMarks!:number;
    numberOfQuestions!:number;
    active!:boolean; 
    category!:Categories;



}