import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ExamDTO} from "../../components/models/ExamDTO";
import {StudentDTO} from "../../components/models/StudentDTO";

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  url = environment.BaseUrl;

  constructor(private http: HttpClient) { }

  getExamParticipants(exam:ExamDTO){
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<StudentDTO[]>(this.url + 'student/getExamParticipants', JSON.stringify(exam), {headers: headers});
  }

}
