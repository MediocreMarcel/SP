import {QuestionWithEvaluationCriteriasDTO} from "./QuestionDto";
import {EvaluationCriteriaDTO} from "./EvaluationCriteriaDTO";

export class CorrectionDTO {

  questionId: number;
  evaluationCriteria: EvaluationCriteriaDTO;
  matrNr: number;
  comment: string;
  reachedPoints: number;
  status: string;

  constructor(questionId: number, evaluationCriteria: EvaluationCriteriaDTO, matrNr: number, comment: string, reachedPoints: number, status: string) {
    this.questionId = questionId;
    this.evaluationCriteria = evaluationCriteria;
    this.matrNr = matrNr;
    this.comment = comment;
    this.reachedPoints = reachedPoints;
    this.status = status;
  }
}
