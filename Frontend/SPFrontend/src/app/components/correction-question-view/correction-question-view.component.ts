import {Component, OnInit} from '@angular/core';
import {ExamDTO} from "../models/ExamDTO";
import {ModuleDTO} from "../models/ModuleDTO";
import {CourseDTO} from "../models/CourseDTO";
import {CreateQuestionService} from "../../services/question/create-question.service";
import {QuestionWithEvaluationCriteriasDTO} from "../models/QuestionDto";
import {EvaluationCriteriaDTO} from "../models/EvaluationCriteriaDTO";
import {CorrectionDTO} from "../models/CorrectionDTO";

@Component({
  selector: 'app-correction-question-view',
  templateUrl: './correction-question-view.component.html',
  styleUrls: ['./correction-question-view.component.css']
})
export class CorrectionQuestionViewComponent implements OnInit {
  exam: ExamDTO;
  questions: QuestionWithEvaluationCriteriasDTO[] = [];
  currentQuestion: QuestionWithEvaluationCriteriasDTO;
  currentEvaluationCriteria: EvaluationCriteriaDTO[] = [];
  currentCorrection: CorrectionDTO[] = [];

  tableHeader = ["RatingCriteria", "MaxPoints", "scoredPoints", "fullPointsCheckpoints"];
  tableFooter = ["RatingCriteria", "MaxPoints", "scoredPoints"];

  constructor(private questionService: CreateQuestionService) {
  }

  ngOnInit(): void {
    this.exam = new ExamDTO(8, "SS 20", "2020-12-20", "2020-12-20", "in_correction", 120, new ModuleDTO(17, new CourseDTO("Wirtschaftsinformatic B.Sc.", 0), "ModulName"));
    this.questionService.getQuestionsWithRatingCriteriaFromDb(this.exam).subscribe(u => {
      this.questions = u;
      this.currentQuestion = this.questions[0];
      this.currentEvaluationCriteria = this.currentQuestion.evaluationCriterias;
      this.currentQuestion.evaluationCriterias.forEach((u,i) => this.currentCorrection.push(new CorrectionDTO(this.currentQuestion.questionId, this.currentQuestion.evaluationCriterias[i], 1, "", 0, "in_progress")));
    });

  }

  totalPointsEval() {
    if (this.currentCorrection.length <= 0) {
      return 0;
    }
    return this.currentCorrection.map(a => a.reachedPoints).reduce(function (a, b) {
      return a + b;
    });
  }

  fullPoints(element: number, checked: boolean) {
    if (checked) {
      this.currentCorrection[element].reachedPoints = this.currentQuestion.evaluationCriterias[element].points;
    } else {
      this.currentCorrection[element].reachedPoints = 0;
    }

  }

}
