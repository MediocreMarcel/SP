export class QuestionDto {

  //questionId: number;
  questionName: string;
  questionText: string;
  questionPoints: number;
  shortName: string;
  category: string;
  module_ID: number;

  constructor(questionName: string, questionText: string, questionPoints: number, shortName: string, category: string, module_ID: number) {
    this.questionName = questionName;
    this.questionText = questionText;
    this.questionPoints = questionPoints;
    this.shortName = shortName;
    this.category = category;
    this.module_ID = module_ID;
  }
}

