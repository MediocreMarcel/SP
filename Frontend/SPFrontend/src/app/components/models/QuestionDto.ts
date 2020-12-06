export class QuestionDto {

  questionId: number;
  name: string;
  questionText: string;
  defaultPoints: number;
  shortName: string;
  category: string;
  module_ID: number;

  constructor(questionId:number, name:string, questionText:string,defaultPoints:number,shortName:string, category:string, module_ID:number) {
    this.questionId = questionId;
    this.name = name;
    this.questionText = questionText;
    this.defaultPoints = defaultPoints;
    this.shortName = shortName;
    this.category = category;
    this.module_ID = module_ID;
  }

}
