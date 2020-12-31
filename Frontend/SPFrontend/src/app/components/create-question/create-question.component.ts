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
  //working variables
  module: ModuleDTO;

  questionPoolByCategoryUnchanged: any[] = [];
  questionPoolByCategory: any[] = [];

  examContent: QuestionDto[] = [];

  questionCategories: string[] = [];

  //header variables
  examTitle = "Unbenannte Klausur"
  totalExamPoints: number;
  course: any;
  semester: string;

  constructor(private examService: CreateExamService) {
    this.module = new ModuleDTO(1, "WI", "Prog 2"); //Needs to be changed to get the current Module
    examService.getQuestionsFromDb(this.module).subscribe(retVal => {
        let pipe = new GroupByPipe();
        pipe.transform(retVal, "category").forEach(u => {
          //crete array with dummy object at first position. This dummy object represents the name of the category
          this.questionPoolByCategory.push([{"questionName": u.key, "isDisabled": true}].concat(u.value));
          //push name of category in corresponding array
          this.questionCategories.push(u.key);
        });
        this.questionPoolByCategoryUnchanged = JSON.parse(JSON.stringify(this.questionPoolByCategory));//Copy Array without reference. Yes this is the best method for it (according to best stackoverflow answer).
      }
    )
  }

  ngOnInit(): void {
  }


  /**
   * Called if something is moved between DragBoxes. Moves the corresponding Values in the arrays
   * @param event Angular drop event
   */
  drop(event: CdkDragDrop<QuestionDto[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (this.questionCategories.includes(event.container.id)) { //if id of drgBox is a name of a question category

        //search in which array the question is located
        let indexOfCategory = this.questionPoolByCategoryUnchanged.map((u, index) => {
          if (u.some(question => ((question.questionId != undefined) && (question.questionId == event.previousContainer.data[event.previousIndex].questionId)))) {
            return index;//returns index if fitting otherwise the result will be undefined
          }
        }).filter(u => u != undefined)[0];//remove undefined and get first element

        //find the old index from this element to sort it right
        let indexOfElement = this.questionPoolByCategoryUnchanged[indexOfCategory].findIndex(question => question.questionId == event.previousContainer.data[event.previousIndex].questionId)

        transferArrayItem(event.previousContainer.data,
          this.questionPoolByCategory[indexOfCategory],
          event.previousIndex,
          indexOfElement);


      } else { //if something is moved into a DrgBox without a fitting id
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      }
    }
  }

}

