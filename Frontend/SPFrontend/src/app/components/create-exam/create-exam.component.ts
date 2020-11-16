import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.css']
})
export class CreateExamComponent implements OnInit {
  topics: Array<moduletopics> = [{
    title: "default item title",
    description: "default item description",
    question: "Frage",
    points: "7 punkte"
  }];
  questions: Array<modulequestion> = [{order: "1.1", points: "7 punkte"}];

  constructor() {
  }

  ngOnInit(): void {
  }


  addTopic() {
    // push object that you need to be added into array
    this.topics.push({
      title: "new title of item",
      description: "default item description",
      question: "Frage",
      points: "7 punkte"
    });
  }

  addQuestion() {
    // push object that you need to be added into array
    this.questions.push({order: "1.2", points: " 8 punkte"});
  }

}

export interface moduletopics {
  title?: string;
  description?: string;
  question?: string;
  points?: string;
}

export interface modulequestion {
  order?: string;
  points?: string;
}
