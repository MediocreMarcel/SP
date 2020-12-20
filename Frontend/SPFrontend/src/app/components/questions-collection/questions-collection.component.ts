import {Component, OnInit} from '@angular/core';
import {QuestionDto} from "../models/QuestionDto";
import {CreateQuestionService} from "../../services/question/create-question.service";
import {ModuleDTO} from "../models/ModuleDTO";

@Component({
  selector: 'app-questions-collection',
  templateUrl: './questions-collection.component.html',
  styleUrls: ['./questions-collection.component.css']
})
export class QuestionsCollectionComponent implements OnInit {

  questions: QuestionDto[];

  selectedQuestions: number[];


  module: ModuleDTO;

  constructor(private examService: CreateQuestionService) {
  }

  ngOnInit(): void {
    let state = history.state;
    delete state.navigationId;
    this.module = history.state;
    this.examService.getQuestionsFromDb(this.module).subscribe(u => {
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
