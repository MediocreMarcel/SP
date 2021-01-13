import {Component, Inject, ViewChild} from "@angular/core";
import {ModuleDTO} from "../../models/ModuleDTO";
import {CreateQuestionService} from "../../../services/question/create-question.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {QuestionWithEvaluationCriteriasDTO, QuestionDto} from "../../models/QuestionDto";
import {EvaluationCriteriaDTO} from "../../models/EvaluationCriteriaDTO";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-questions-create-collection',
  templateUrl: 'questions-collection.create_question_dialog.html',
  styleUrls: ['questions-collection.create_question_dialog.css']
})

export class CreateQuestionDialog {
  questionName: string;
  shortName: string;
  questionText: string;
  category: string;
  module: ModuleDTO;

  @ViewChild('evalTable') table;

  evaluationCriteriaHeader: string[] = ['Bewertungskriterium', 'Punkte', 'Löschen'];
  evaluationCriterias: EvaluationCriteriaDTO[] = [];
  allFieldsHaveValues: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private service: CreateQuestionService, private dialogRef: MatDialogRef<CreateQuestionDialog>, private snackBar: MatSnackBar) {
      this.module = data.module;
  }

  /**
   * Writes question input-fields from CreateQuestionDialog-window to DB
   */
  writeQuestion() {
    if (this.isNeededInformationFilledIn()){
      this.service.writeQuestionToDb(new QuestionWithEvaluationCriteriasDTO(null, this.questionName, this.questionText, this.totalPointsEval(), this.shortName, this.category, this.module.module_id, -1, this.evaluationCriterias)).subscribe();
      this.dialogRef.close();
    } else{
      this.snackBar.open("Bitte alle Felder ausfüllen!", "Schließen", {duration: 4000});
    }

  }

  /**
   * adds a new evaluation criteria
   * @param criteria name of the criteria
   * @param points points for the criteria
   */
  addEvaluationCriteria(criteria: string, points: number) {
    if (criteria != "" && !isNaN(points)) {
      this.evaluationCriterias.push(new EvaluationCriteriaDTO(criteria, points));
      this.table.renderRows();
    }
  }

  /**
   * Gets the sum of all points from evaluationCriterias array
   */
  totalPointsEval() {
    if (this.evaluationCriterias.length <= 0) {
      return 0;
    }
    return this.evaluationCriterias.map(a => a.points).reduce(function (a, b) {
      return a + b;
    });
  }

  /**
   * removes an entry of the evaluation criterias
   * @param index index of the element that should be removed
   */
  removeEvalCriteria(index: number) {
    this.evaluationCriterias.splice(index, 1);
    this.table.renderRows();
  }

  /**
   * checks if all fields have values
   */
  isNeededInformationFilledIn() {
    return this.questionName != undefined &&
      this.shortName != undefined &&
      this.questionText != undefined &&
      this.category != undefined &&
      this.evaluationCriterias.length > 0;
  }
}