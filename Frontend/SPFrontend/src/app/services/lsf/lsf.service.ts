import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {StudentDTO} from "../../components/models/StudentDTO";

@Injectable({
  providedIn: 'root'
})
export class LsfService {

  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  url = environment.BaseUrl;

  constructor(private http: HttpClient) { }



  uploadLsfParticipantList(postData: FormData){
    return this.http.post<StudentDTO[]>(this.url + "lsf/student_import", postData);
  }


}
