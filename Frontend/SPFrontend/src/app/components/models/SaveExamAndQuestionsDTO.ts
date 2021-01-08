import {QuestionDto} from "./QuestionDto";
import {ExamDTO} from "./ExamDTO";

export class SaveExamAndQuestionsDTO {
  exam: ExamDTO;
  questions: QuestionDto[];

  constructor(exam: ExamDTO, questions: QuestionDto[]) {
    this.exam = exam;
    this.questions = questions;
  }

}
