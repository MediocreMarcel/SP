import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ModuleDTO} from '../components/questions-overview/questions-overview.component';
import {QuestionDto} from "../components/models/QuestionDto";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class CreateQuestionService {

  url = environment.BaseUrl;

  constructor(private http: HttpClient) { }

  getQuestionsFromDb(postData: ModuleDTO){
    console.log(postData);
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<QuestionDto[]>(this.url + 'questions/getQuestion', JSON.stringify(postData), {headers: headers});
  }

  writeQuestionToDb(postData: QuestionDto){
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    console.log(postData);
    return this.http.post<QuestionDto>(this.url + 'questions/newQuestion', JSON.stringify(postData), {headers: headers});
  }
}
