import {ExamDTO} from "./ExamDTO";
import {User} from "./User";

export class DeleteExamDTO {
  exam: ExamDTO;
  user: User;

  constructor(exam: ExamDTO, user: User) {
    this.exam = exam;
    this.user = user;
  }

}
