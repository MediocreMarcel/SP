export class EvaluationCriteriaDTO {

  criteria: string;
  points: number;


  constructor(criteria, points) {
    this.criteria = criteria;
    this.points = points;
  }
}
