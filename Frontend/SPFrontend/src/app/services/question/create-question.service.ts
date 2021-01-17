import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {QuestionWithEvaluationCriteriasDTO, ExamQuestionDTO, QuestionDto} from "../../components/models/QuestionDto";
import {environment} from "../../../environments/environment";
import {ModuleDTO} from "../../components/models/ModuleDTO";
import {ExamDTO} from "../../components/models/ExamDTO";


@Injectable({
  providedIn: 'root'
})
export class CreateQuestionService {

  url = environment.BaseUrl;

  constructor(private http: HttpClient) { }

  /**
   * HTTP-Request to Backend. Gets Questions for a specific Module
   * @param postData Module for which questions should be retrieved
   */
  getQuestionsFromDb(postData: ModuleDTO){
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<QuestionWithEvaluationCriteriasDTO[]>(this.url + 'questions/getQuestion', JSON.stringify(postData), {headers: headers});
  }

  /**
   * HTTP-Request to Backend. Gets Questions with rating-criteria from a specific Exam
   * @param postData Exam for which questions should be retrieved
   */
  getQuestionsWithRatingCriteriaFromDb(postData: ExamDTO){
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<QuestionWithEvaluationCriteriasDTO[]>(this.url + 'questions/getQuestionsWithRatingCriteria', JSON.stringify(postData), {headers: headers});
  }

  /**
   * HTTP-Request to Backend. Question subject to be written to DB.
   * @param postData Question abiding to DTO subjected to be written to DB
   */
  writeQuestionToDb(postData: QuestionWithEvaluationCriteriasDTO){
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<QuestionDto>(this.url + 'questions/newQuestion', JSON.stringify(postData), {headers: headers});
  }

  /**
   * HTTP-Request to Backend. Question(s) subject to deletion are sent to backend
   * @param questionWithEvaluationCriteriasDTOS Question(s) abiding to DTO subjected to deletion
   */
  deleteQuestions(questionWithEvaluationCriteriasDTOS: QuestionWithEvaluationCriteriasDTO[]){
    const headers = new HttpHeaders().set('Content-Type', 'application/json;');
    return this.http.post(this.url + 'questions/deleteQuestions', JSON.stringify(questionWithEvaluationCriteriasDTOS), { headers: headers });//http request, since http delete does not work with a body
  }

  /**
   * HTTP-Request to Backend. Gets Questions from a specific Exam
   * @param postData Exam for which questions should be retrieved
   */
  getExamQuestionsFromDb(postData: ExamDTO){
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<ExamQuestionDTO[]>(this.url + 'questions/getQuestionExam', JSON.stringify(postData), {headers: headers});
  }

  /**
   * HTTP-Request to Backend. Question subject to be flagged as deleted is sent to backend
   * @param questionWithEvaluationCriteriasDTO Question abiding to DTO subject to be flagged as deleted
   */
  writeQuestionUpdateToDb(questionWithEvaluationCriteriasDTO: QuestionWithEvaluationCriteriasDTO) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<QuestionDto>(this.url + 'questions/updateQuestion', JSON.stringify(questionWithEvaluationCriteriasDTO), {headers: headers});
  }
}
