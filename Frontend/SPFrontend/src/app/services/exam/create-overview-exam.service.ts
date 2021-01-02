import { Injectable } from '@angular/core';
import {User} from "../../components/models/User";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {CreateExamDTO, ExamDTO} from "../../components/models/ExamDTO";

@Injectable({
  providedIn: 'root'
})
export class CreateOverviewExamService {

  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  url = environment.BaseUrl;

  constructor(private http: HttpClient) { }

  getExamsForUser(user: User){
    return this.http.post<ExamDTO[]>(this.url + "exams/getExams", JSON.stringify(user), {headers: this.headers});
  }

  createNewExam(module: CreateExamDTO){
    console.log(module);
    this.http.post(this.url + "exams/new_exam", JSON.stringify(module), {headers: this.headers}).subscribe();
  }


}
