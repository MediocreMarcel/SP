import {Component, OnInit} from '@angular/core';
import {QuestionDto} from "../models/QuestionDto";
import {CreateExamService} from "../../services/create-exam.service";
import {ModuleDTO} from "../questions-overview/questions-overview.component";

@Component({
  selector: 'app-questions-collection',
  templateUrl: './questions-collection.component.html',
  styleUrls: ['./questions-collection.component.css']
})
export class QuestionsCollectionComponent implements OnInit {

  questions: QuestionDto[];

  selectedQuestions: QuestionDto[] = [];

  examService: CreateExamService;

  module: ModuleDTO;

  constructor(examService: CreateExamService) {
    this.examService = examService;
  }

  ngOnInit(): void {
    let state = history.state;
    delete state.navigationId;
    this.module = history.state;
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
    this.examService.deleteQuestions(this.selectedQuestions).subscribe( response => {
      this.loadQuestions();
    });
  }

  createQuestion() {
    //TODO call dialog from other task once merged
  }

  loadQuestions(){
    this.examService.getQuestionsFromDb(this.module).subscribe(response => {
      this.questions = response;
    });
  }
}
