import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {User} from "../../components/models/User";
import {CreateModuleDTO, ModuleDTO} from "../../components/models/ModuleDTO";

@Injectable({
  providedIn: 'root'
})
export class LsfService {

  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  url = environment.BaseUrl;

  constructor(private http: HttpClient) { }



  uploadLsfParticipantList(postData: FormData){
    return this.http.post(this.url + "lsf/student_import", postData, {headers: this.headers});
  }


}
