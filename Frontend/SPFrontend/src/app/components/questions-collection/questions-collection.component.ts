import {Component, OnInit} from '@angular/core';
import {QuestionDto, QuestionWithEvaluationCriteriasDTO} from "../models/QuestionDto";
import {Router} from "@angular/router";
import {ModuleDTO} from "../models/ModuleDTO";
import {CreateQuestionService} from "../../services/question/create-question.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CreateQuestionDialog} from "./create_question/questions-collection.create_question_dialog";

@Component({
  selector: 'app-questions-collection',
  templateUrl: './questions-collection.component.html',
  styleUrls: ['./questions-collection.component.css']
})
export class QuestionsCollectionComponent implements OnInit {

  questions: QuestionWithEvaluationCriteriasDTO[];

  selectedQuestions: QuestionWithEvaluationCriteriasDTO[] = [];

  module: ModuleDTO;

  constructor(private examService: CreateQuestionService, private router: Router, public dialog: MatDialog) {

  }

  /**
   * Loads needed data
   */
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

  /**
   * Adds or removes a checkbox from the data layer if event is triggered
   * @param question question that should be removed/added
   */
  checkboxChanged(question: QuestionWithEvaluationCriteriasDTO) {
    let deleted = false;
    this.selectedQuestions.forEach((element, index) => {
      if (element.questionId == question.questionId) {
        this.selectedQuestions.splice(index, 1);
        deleted = true;
      }
    });
    if (!deleted) {
      this.selectedQuestions.push(question);
    }
  }

  /**
   * Deletes selected question(s) from DB and reloads questionpool
   */
  deleteSelection() {
    this.examService.deleteQuestions(this.selectedQuestions).subscribe(response => {
      this.selectedQuestions = [];
      this.loadQuestions();
    });
  }

  hideQuestion(question) {
    console.log(question);
    const dialogRef = this.dialog.open(CreateQuestionDialog, {
      width: '50%',
      height: '95%',
      data: {module: this.module, question: question}
    });

    dialogRef.afterClosed().subscribe(create => {
      this.loadQuestions();
    });
  }

  /**
   * Opens a new CreateQuestionDialog-window and reloads questionpool after closing
   */
  createQuestion() {
    const dialogRef = this.dialog.open(CreateQuestionDialog, {
      width: '50%',
      height: '95%',
      data: {module: this.module}
    });

    dialogRef.afterClosed().subscribe(create => {
      this.loadQuestions();
    });
  }

  /**
   * loads questions from DB and displays them in the questionpool
   */
  loadQuestions() {
    this.examService.getQuestionsFromDb(this.module).subscribe(response => {
      this.questions = response;
    });
  }
}
