import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ExamDTO} from "../../components/models/ExamDTO";
import {User} from "../../components/models/User";

@Injectable({
  providedIn: 'root'
})
export class CorrectionOverviewExamService {

  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  url = environment.BaseUrl;

  constructor(private http: HttpClient) {
  }

  getExamsforCorrection(user: User){
    return this.http.post<ExamDTO[]>(this.url + "correction/getExamsforCorrection", JSON.stringify(user), {headers: this.headers});
  }

}
