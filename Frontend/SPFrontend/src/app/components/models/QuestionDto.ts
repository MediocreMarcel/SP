import {EvaluationCriteriaDTO} from "./EvaluationCriteriaDTO";

export class QuestionDto {

  questionId: number;
  questionName: string;
  questionText: string;
  questionPoints: number;
  shortName: string;
  category: string;
  module_ID: number;

  constructor(questionID: number, questionName: string, questionText: string, questionPoints: number, shortName: string, category: string, module_ID: number) {
    this.questionId = questionID;
    this.questionName = questionName;
    this.questionText = questionText;
    this.questionPoints = questionPoints;
    this.shortName = shortName;
    this.category = category;
    this.module_ID = module_ID;
  }
}

export class ExamQuestionDTO extends QuestionDto {

  position: number;

  constructor(questionID: number, questionName: string, questionText: string, questionPoints: number, shortName: string, category: string, module_ID: number, position: number) {
    super(questionID, questionName, questionText, questionPoints, shortName, category, module_ID);
    this.position = position;
  }

}

export class CreateQuestionDTO extends QuestionDto {

  evaluationCriterias: EvaluationCriteriaDTO[];

  constructor(questionID: number, questionName: string, questionText: string, questionPoints: number, shortName: string, category: string, module_ID: number, evaluationCriterias: EvaluationCriteriaDTO[]) {
    super(questionID, questionName, questionText, questionPoints, shortName, category, module_ID);
    this.evaluationCriterias = evaluationCriterias;
  }

}

