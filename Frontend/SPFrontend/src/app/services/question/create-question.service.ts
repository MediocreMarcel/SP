import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {QuestionDto} from "../../components/models/QuestionDto";
import {environment} from "../../../environments/environment";
import {ModuleDTO} from "../../components/models/ModuleDTO";
import {ExamDTO} from "../../components/models/ExamDTO";


@Injectable({
  providedIn: 'root'
})
export class CreateQuestionService {

  url = environment.BaseUrl;

  constructor(private http: HttpClient) { }

  getQuestionsFromDb(postData: ModuleDTO){
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<QuestionDto[]>(this.url + 'questions/getQuestion', JSON.stringify(postData), {headers: headers});
  }

  writeQuestionToDb(postData: QuestionDto){
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    console.log(postData);
    return this.http.post<QuestionDto>(this.url + 'questions/newQuestion', JSON.stringify(postData), {headers: headers});
  }

  deleteQuestions(questions: QuestionDto[]){
    const headers = new HttpHeaders().set('Content-Type', 'application/json;');
    return this.http.post(this.url + 'questions/deleteQuestions', JSON.stringify(questions), { headers: headers });//http request, since http delete does not work with a body
  }

  getExamQuestionsFromDb(postData: ExamDTO){
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<QuestionDto[]>(this.url + 'questions/getQuestionExam', JSON.stringify(postData), {headers: headers});
  }
}
