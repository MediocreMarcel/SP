import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CreateExamDialogOverview} from "../create-exam-overview/create-exam-overview.component";
import {CreateExamService} from "../../services/create-exam.service";
import {ModuleDTO} from "../questions-overview/questions-overview.component";


@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.css']
})
export class CreateExamComponent implements OnInit {
  questions: QuestionDto[];

  constructor(public dialog: MatDialog, private service: CreateExamService) {
    this.loadQuestions();
  }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateExamQuestionDialog, {
      width: '250px'

    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadQuestions();
    });
  }

  private loadQuestions() {
    this.service.getQuestionsFromDb(new ModuleDTO(1, "Informatik", "Prog1")).subscribe(result => {
      this.questions = result;
      console.log(result);
    });
  }
}

export interface moduletopics {
  title?: string;
  description?: string;
  question?: string;
  points?: string;
}


@Component({
  selector: 'app-create-exam-question-dialog',
  templateUrl: './create-exam-question-dialog.html',
  styleUrls: ['./create-exam.component.css']
})
export class CreateExamQuestionDialog {
  constructor(private service: CreateExamService, private dialogRef: MatDialogRef<CreateExamQuestionDialog>) {
  }

  questionName: string;
  questionPoints: number;

  addQuestion() {
    var newQuestion = new QuestionDto(this.questionName, this.questionPoints);
    console.log(newQuestion);
    // push object that you need to be added into array
    this.service.writeQuestionToDb(newQuestion).subscribe();
    this.dialogRef.close();

  }

}

export class QuestionDto {
  module_ID: number;
  questionName: string;
  questionPoints: number;

  constructor(questionName: string, questionPoints: number,) {
    this.questionName = questionName;
    this.questionPoints = questionPoints;
    this.module_ID = 1;
  }
}


