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

  selectedQuestions: number[];

  examService: CreateExamService;

  module: ModuleDTO;

  constructor(examService: CreateExamService) {
    this.examService = examService;
  }

  ngOnInit(): void {
    this.module =history.state;
    this.examService.getQuestionsFromDb(history.state).subscribe(u => {
      this.questions = u;
    });
  }

  checkboxChanged(id: number) {
    let deleted = false;
    this.selectedQuestions.forEach((element, index) => {
      if (element == id) {
        this.selectedQuestions.splice(index, 1);
        deleted = true;
      }
    });
    if (!deleted) {
      this.selectedQuestions.push(id);
    }
  }

  deleteSelection() {
    //TODO call service with array
  }

  createQuestion() {
    //TODO call dialog from other task once merged
  }

}
