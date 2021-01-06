import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {QuestionDto} from "../models/QuestionDto";
import {CreateQuestionService} from "../../services/question/create-question.service";
import {GroupByPipe} from "../pipes/group-by.pipe";
import {ExamDTO} from "../models/ExamDTO";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-question',
  templateUrl: './exam-editor.component.html',
  styleUrls: ['./exam-editor.component.css']
})
export class ExamEditorComponent implements OnInit {
  //working variables
  exam: ExamDTO;

  questionPoolByCategoryUnchanged: any[] = [];
  questionPoolByCategory: any[] = [];

  examContent: QuestionDto[] = [];

  questionCategories: string[] = [];

  //header variables
  examTitle = "Unbenannte Klausur"
  totalExamPoints: number;
  course: any;
  semester: string;

  /**
   * creates object, is loading needed data
   * @param examService service to load exam data from db
   * @param router angular router to navigate between pages
   */
  constructor(private examService: CreateQuestionService, private router: Router) {
  }

  /**
   * NgOnInit is used to get the current exam from the previous page
   */
  ngOnInit(): void {
    let state = history.state;
    delete state.navigationId;
    this.exam = state;
    if (this.exam.exam_id == undefined) {
      let examJson = localStorage.getItem("currentExamForExamEditor");
      if (examJson == null) {
        this.router.navigate(["/exam-overview"]);
        return;
      }
      this.exam = JSON.parse(examJson);
    } else {
      localStorage.setItem("currentExamForExamEditor", JSON.stringify(this.exam));
    }

    this.examService.getQuestionsFromDb(this.exam.module).subscribe(retVal => {
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

