import {Component, OnInit} from '@angular/core';
import {QuestionDto} from "../models/QuestionDto";
import {Router} from "@angular/router";
import {ModuleDTO} from "../models/ModuleDTO";
import {CreateQuestionService} from "../../services/question/create-question.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-questions-collection',
  templateUrl: './questions-collection.component.html',
  styleUrls: ['./questions-collection.component.css']
})
export class QuestionsCollectionComponent implements OnInit {

  questions: QuestionDto[];

  selectedQuestions: QuestionDto[] = [];


  module: ModuleDTO;

  constructor(private examService: CreateQuestionService, private router: Router, public dialog: MatDialog) {

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

  /**
   * Deletes selected question(s) from DB and reloads questionpool
   */
  deleteSelection() {
    this.examService.deleteQuestions(this.selectedQuestions).subscribe(response => {
      this.loadQuestions();
    });
  }

  /**
   * Opens a new CreateQuestionDialog-window and reloads questionpool after closing
   */
  createQuestion() {
    const dialogRef = this.dialog.open(CreateQuestionDialog, {
      width: '50%',
      height: '80%'
    });

    dialogRef.afterClosed().subscribe(create => {
      this.loadQuestions();
      console.log(this.questions);
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

@Component({
  selector: 'app-questions-create-collection',
  templateUrl: './create_question/questions-collection.create_question_dialog.html',
  styleUrls: ['./create_question/questions-collection.create_question_dialog.css']
})

export class CreateQuestionDialog {
  questionName: string;
  shortName: string;
  questionText: string;
  questionPoints: number;
  category: string;
  module: ModuleDTO;

  constructor(private service: CreateQuestionService, private dialogRef: MatDialogRef<CreateQuestionDialog>) {
  }

  /**
   * Writes question input-fields from CreateQuestionDialog-window to DB
   */
  writeQuestion() {
    this.module = history.state;
    this.service.writeQuestionToDb(new QuestionDto(null, this.questionName, this.questionText, this.questionPoints, this.shortName, this.category, this.module.module_id)).subscribe();
    this.dialogRef.close();
  }
}
