export class QuestionDto{

  questionId: number;
  name: string;
  questionText: string;
  defaultPoints: number;
  shortName: string;
  category:string;

  constructor(questionId:number, name:string, questionText:string,defaultPoints:number,shortName:string, category:string) {
    this.questionId = questionId;
    this.name = name;
    this.questionText = questionText;
    this.defaultPoints = defaultPoints;
    this.shortName = shortName;
    this.category = category;
  }
}
