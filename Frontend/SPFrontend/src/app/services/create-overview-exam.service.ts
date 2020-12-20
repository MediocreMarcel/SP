import { Injectable } from '@angular/core';
import {User} from "../components/models/User";
import {CreateExamDTO, ExamDTO} from "../components/exam-overview/exam-overview.component";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CreateOverviewExamService {

  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  url = environment.BaseUrl;

  constructor(private http: HttpClient) { }

  getExamsForUser(user: User){
    return this.http.post<ExamDTO[]>(this.url + "questions/modules", JSON.stringify(user), {headers: this.headers});
  }

  createNewExam(module: CreateExamDTO){
    console.log(module);
    this.http.post(this.url + "questions/new_module", JSON.stringify(module), {headers: this.headers}).subscribe();
  }


}
