import {Injectable} from '@angular/core';
import {User} from "../../components/models/User";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {CreateExamDTO, ExamDTO} from "../../components/models/ExamDTO";
import {SaveExamAndQuestionsDTO} from "../../components/models/SaveExamAndQuestionsDTO";
import {DeleteExamDTO} from "../../components/models/DeleteExamDTO";

@Injectable({
  providedIn: 'root'
})
export class CreateOverviewExamService {

  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  url = environment.BaseUrl;

  constructor(private http: HttpClient) {
  }

  getExamsForUser(user: User) {
    return this.http.post<ExamDTO[]>(this.url + "exams/getExams", JSON.stringify(user), {headers: this.headers});
  }

  createNewExam(module: CreateExamDTO) {
    this.http.post(this.url + "exams/new_exam", JSON.stringify(module), {headers: this.headers}).subscribe();
  }

  saveExam(examAndQuestions: SaveExamAndQuestionsDTO) {
    this.http.post(this.url + "exams/save_exam", JSON.stringify(examAndQuestions), {headers: this.headers}).subscribe();
  }

  deleteExam(deleteExamDTO: DeleteExamDTO){
    return this.http.post(this.url + "exams/delete", JSON.stringify(deleteExamDTO), {headers: this.headers});
  }

}
