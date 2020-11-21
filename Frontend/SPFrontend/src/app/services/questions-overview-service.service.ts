import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ModuleDTO} from "../components/questions-overview/questions-overview.component";

@Injectable({
  providedIn: 'root'
})
export class QuestionsOverviewService {

  constructor(private http: HttpClient) { }

  sendModuleToDB(postData: object){
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<ModuleDTO[]>("http://localhost:8080/rest/questions/modules", JSON.stringify(postData), {headers: headers});

  }
}
