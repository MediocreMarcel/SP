import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {CourseDTO} from "../../components/models/CourseDTO";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  url = environment.BaseUrl;

  constructor(private http: HttpClient) { }

  /**
   * Gets all available courses
   */
  getAllCourses() {
    return this.http.get<CourseDTO[]>(this.url + "courses/get", {headers: this.headers});
  }

}
