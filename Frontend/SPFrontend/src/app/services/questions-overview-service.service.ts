import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CreateModuleDTO, ModuleDTO} from "../components/questions-overview/questions-overview.component";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class QuestionsOverviewService {

  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  url = environment.BaseUrl;

  constructor(private http: HttpClient) { }



  getModulesForUser(user: object){//TODO Change User when Class is added
    return this.http.post<ModuleDTO[]>(this.url + "questions/modules", JSON.stringify(user), {headers: this.headers});
  }

  createNewModule(module: CreateModuleDTO){
    module.user_id = 0;
    console.log(module);
    this.http.post(this.url + "questions/new_module", JSON.stringify(module), {headers: this.headers}).subscribe();
  }


}
