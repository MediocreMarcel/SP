import {Component, OnInit} from '@angular/core';
import {QuestionDto} from "../models/QuestionDto";
import {CreateExamService} from "../../services/create-exam.service";
import {ModuleDTO} from "../questions-overview/questions-overview.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-questions-collection',
  templateUrl: './questions-collection.component.html',
  styleUrls: ['./questions-collection.component.css']
})
export class QuestionsCollectionComponent implements OnInit {

  questions: QuestionDto[];

  selectedQuestions: QuestionDto[] = [];


  module: ModuleDTO;

  constructor(examService: CreateExamService, private router: Router) {
    this.examService = examService;
  }

  ngOnInit(): void {

    let state = history.state;
    delete state.navigationId;
    this.module = state;
    if (this.module.module_id == undefined) {
      let moduleJSON = localStorage.getItem("currentModuleQuestionsCollection");
      if (moduleJSON == null) {
        this.router.navigate(["/questions-overview"]);
        return;
      }
      this.module = JSON.parse(moduleJSON);
    } else {
      localStorage.setItem("currentModuleQuestionsCollection", JSON.stringify(this.module));
    }


    this.examService.getQuestionsFromDb(this.module).subscribe(u => {
      this.questions = u;
    });
  }

  checkboxChanged(question: QuestionDto) {
    let deleted = false;
    this.selectedQuestions.forEach((element, index) => {
      if (element.module_ID == question.module_ID) {
        this.selectedQuestions.splice(index, 1);
        deleted = true;
      }
    });
    if (!deleted) {
      this.selectedQuestions.push(question);
    }
  }

  deleteSelection() {
    this.examService.deleteQuestions(this.selectedQuestions).subscribe(response => {
      this.loadQuestions();
    });
  }

  createQuestion() {
    //TODO call dialog from other task once merged
  }

  loadQuestions() {
    this.examService.getQuestionsFromDb(this.module).subscribe(response => {
      this.questions = response;
    });
  }
}
