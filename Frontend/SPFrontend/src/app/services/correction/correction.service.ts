import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {CorrectionDTO} from "../../components/models/CorrectionDTO";
import {QuestionDto} from "../../components/models/QuestionDto";
import {ExamDTO} from "../../components/models/ExamDTO";
import {QuestionWithAveragePointsDTO} from "../../components/models/QuestionWithAveragePointsDTO";

@Injectable({
  providedIn: 'root'
})
export class CorrectionService {

  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  url = environment.BaseUrl;

  constructor(private http: HttpClient) { }

  /**
   * Sends a correctionDTO array to the backend to save them to the db
   * @param postData array to save
   */
  saveCorrection(postData:CorrectionDTO[]) {
    return this.http.post(this.url + "correction/save", JSON.stringify(postData), {headers: this.headers});
  }

  /**
   * Loads correctionDto objects from the db via the backend
   * @param student student of the correction
   * @param question question of the correction
   */
  getCorrection(exam: ExamDTO){
    return this.http.post<CorrectionDTO[][]>(this.url + "correction/load",JSON.stringify(exam), {headers: this.headers});
  }

  /**
   * Loads all questions from a exam with the avg of scored points from the db via the backend
   * @param exam exam that should be queried
   */
  getCorrectedQuestionsAVG(exam: ExamDTO){
    return this.http.post<QuestionWithAveragePointsDTO[]>(this.url + "correction/getCorrectedQuestionsAVG",JSON.stringify(exam), {headers: this.headers});
  }
}
