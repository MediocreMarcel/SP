import { Injectable } from '@angular/core';
import {User} from "../../components/models/User";
import {ExamDTO} from "../../components/models/ExamDTO";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ExamArchiveServiceService {

  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  url = environment.BaseUrl;

  constructor(private http: HttpClient) { }

  getExamsFromArchivForUser(user: User){
    return this.http.post<ExamDTO[]>(this.url + "exams/getExamsfromArchiv", JSON.stringify(user), {headers: this.headers});
  }

  archiveExam(exam: ExamDTO) {
    return this.http.post<ExamDTO[]>(this.url + "exams/archive", JSON.stringify(exam), {headers: this.headers});
  }
}
