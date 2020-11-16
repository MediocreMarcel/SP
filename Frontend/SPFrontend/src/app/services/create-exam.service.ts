import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {QuestionDto} from '../components/create-exam/create-exam.component';
import {ModuleDTO} from '../components/questions-overview/questions-overview.component';


@Injectable({
  providedIn: 'root'
})
export class CreateExamService {

  constructor(private http: HttpClient) { }

  getQuestionsFromDb(postData: ModuleDTO){
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<QuestionDto[]>('http://localhost:8080/rest/questions/getQuestion', JSON.stringify(postData), {headers: headers});

  }

  writeQuestionToDb(postData: QuestionDto){
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    console.log(postData);
    return this.http.post<QuestionDto>('http://localhost:8080/rest/questions/newQuestion', JSON.stringify(postData), {headers: headers});
  }
}
