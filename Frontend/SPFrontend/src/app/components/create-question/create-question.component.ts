import {Component, OnInit} from '@angular/core';
import {CreateExamService} from "../../services/create-exam.service";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {ModuleDTO} from "../questions-overview/questions-overview.component";
import {QuestionDto} from "../models/QuestionDto";
import {GroupByPipe} from "../questions-collection/group-by.pipe";

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {
  examTitle = "Unbenannte Klausur"

  module: ModuleDTO;

  questionPool: QuestionDto[] = [];
  questionPoolByCategory: any[] = [];

  examContent: QuestionDto[] = [];

  questionCategories: string[] = [];

  JSON = JSON;

  constructor(private examService: CreateExamService) {
    this.module = new ModuleDTO(1, "WI", "Prog 2")
    examService.getQuestionsFromDb(this.module).subscribe(retVal => {
        this.questionPool = retVal;

        let pipe = new GroupByPipe();
        pipe.transform(retVal, "category").forEach(u => {
          //crete array with dummy object at first position. This dummy object represents the name of the category
          this.questionPoolByCategory.push([{"questionName": u.key, "isDisabled": true}].concat(u.value));
          //push name of category in corresponding array
          this.questionCategories.push(u.key);
        });
        console.log(this.questionPoolByCategory);
      }
    )
  }

  ngOnInit(): void {
  }


  //called if something has been dropped between questions and exam
  drop(event: CdkDragDrop<QuestionDto[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else if(this.questionCategories.includes(event.container.id) && event.currentIndex == 0) {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.container.data.length);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}

