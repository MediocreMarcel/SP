import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  createExam(){
    this.router.navigate(['/exam-overview']);
  }
  correctExam(){
    this.router.navigate(['/test']);
  }
  archiveExam(){
    this.router.navigate(['/archived-exams']);
  }
  addQuestions(){
    this.router.navigate(['/questions-overview']);
  }

}
