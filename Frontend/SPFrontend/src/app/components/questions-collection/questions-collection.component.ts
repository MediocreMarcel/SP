import {Component, OnInit} from '@angular/core';
import {QuestionDto} from "../dto/questionDto";

@Component({
  selector: 'app-questions-collection',
  templateUrl: './questions-collection.component.html',
  styleUrls: ['./questions-collection.component.css']
})
export class QuestionsCollectionComponent implements OnInit {

  questions: QuestionDto[];

  selectedQuestions: number[];

  constructor() {
    var cat1 = [new QuestionDto(2, "name2", "text", 5, "shortname2", "cat2"), new QuestionDto(3, "name2", "text", 5, "shortname2", "cat2"), new QuestionDto(1, "name", "text", 5, "shortname", "cat1")];
    this.questions = cat1;
  }

  ngOnInit(): void {
  }

  checkboxChanged(id: number) {
    let deleted = false;
    this.selectedQuestions.forEach( (element, index) => {
      if (element == id) {
        this.selectedQuestions.splice(index, 1);
        deleted = true;
      }
    });
    if (!deleted){
      this.selectedQuestions.push(id);
    }
  }

  deleteSelection(){
    //TODO call service with array
  }

  createQuestion(){
    //TODO call dialog from other task once merged
  }

}
