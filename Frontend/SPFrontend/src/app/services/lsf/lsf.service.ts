import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {StudentDTO} from "../../components/models/StudentDTO";
import {ExamDTO} from "../../components/models/ExamDTO";

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


  getLsfExcel(postData: ExamDTO) {
    let headerOptions = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.ms-excel'
    });

    let requestOptions = {headers: headerOptions, responseType: 'blob' as 'blob'};

    return this.http.post(this.url + "lsf/student_export", JSON.stringify(postData),requestOptions);

  }


}
