import {ExamQuestionDTO} from "./QuestionDto";

export class QuestionWithAveragePointsDTO {

    question: ExamQuestionDTO;
    avg: number;


  constructor(question: ExamQuestionDTO, avg: number) {
    this.question = question;
    this.avg = avg;
  }
}
