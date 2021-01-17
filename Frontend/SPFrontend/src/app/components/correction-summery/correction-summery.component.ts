import {Component, OnInit} from '@angular/core';
import {ExamDTO} from "../models/ExamDTO";
import {ModuleDTO} from "../models/ModuleDTO";
import {CourseDTO} from "../models/CourseDTO";
import {CorrectionService} from "../../services/correction/correction.service";
import {QuestionWithAveragePointsDTO} from "../models/QuestionWithAveragePointsDTO";
import {StudentDTO} from "../models/StudentDTO";
import {StudentsService} from "../../services/students/students.service";
import {CorrectionDTO} from "../models/CorrectionDTO";
import {Router} from "@angular/router";
import {ExamArchiveServiceService} from "../../services/exam-archiv/exam-archive-service.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LsfService} from "../../services/lsf/lsf.service";

@Component({
  selector: 'app-correction-summery',
  templateUrl: './correction-summery.component.html',
  styleUrls: ['./correction-summery.component.css']
})
export class CorrectionSummeryComponent implements OnInit {

  exam: ExamDTO;
  questionsWithAVG: QuestionWithAveragePointsDTO[];
  students: StudentDTO[];
  corrections: CorrectionDTO[][] = [];
  progress: number = 0;

  //variables for the html table
  tableHeader = ["RatingCriteria", "MaxPoints", "scoredPoints", "grade"];
  tableFooter = ["RatingCriteria", "MaxPoints", "scoredPoints", "grade"];
  jumpToQuestion: QuestionWithAveragePointsDTO;
  jumpToUser: StudentDTO;

  /**
   * constructor loads needed data
   * @param correctionService corrections service, provided by angular
   * @param studentService student service, provided by angular
   * @param router router provided by angular
   * @param examArchiveService archive service, provided by angular
   * @param snackBar snackbar provided by angular
   * @param lsfService lsf service provided by angular
   */
  constructor(private correctionService: CorrectionService, private studentService: StudentsService, private router: Router, private examArchiveService: ExamArchiveServiceService, private snackBar: MatSnackBar, private lsfService: LsfService) {
   //load and save exam in internal storage, if site is refreshed
    let state = history.state;
    delete state.navigationId;
    this.exam = state;

    if (this.exam == undefined || Object.keys(this.exam).length == 0) {
      let moduleJSON = localStorage.getItem("currentCorrectionExam");
      if (moduleJSON == null) {
        this.router.navigate(["/correction-overview"]);
        return;
      }
      this.exam = JSON.parse(moduleJSON);
    } else {
      localStorage.setItem("currentCorrectionExam", JSON.stringify(this.exam));
    }

    //get questions
    this.correctionService.getCorrectedQuestionsAVG(this.exam).subscribe(u => {
      this.questionsWithAVG = u;
      this.questionsWithAVG.sort((a,b) => a.question.position-b.question.position);
    });
    //get students
    this.studentService.getExamParticipants(this.exam).subscribe(u => this.students = u);
    this.correctionService.getCorrection(this.exam).subscribe(u => {
      this.corrections = u;
    });
  }

  ngOnInit(): void {
  }

  /**
   * jumps to a certain question in the correction question view
   */
  jumpTo() {
    this.router.navigate(["correction-question"], {
      state: {
        exam: this.exam,
        student: this.jumpToUser,
        question: this.jumpToQuestion
      }
    });
  }

  /**
   * calculates the sum of possible points
   */
  getSumOfQuestionPoints() {
    return this.questionsWithAVG.reduce((counter, currentValue) => counter + currentValue.question.questionPoints, 0);
  }

  /**
   * get sum of average reached points
   */
  getSumOfAvg() {
    return this.questionsWithAVG.reduce((counter, currentValue) => counter + currentValue.avg, 0);
  }

  /**
   * calculates the average grade
   */
  getGradeAvg() {
    return -1*((this.getSumOfAvg()*5/ this.getSumOfQuestionPoints())-6);
  }

  /**
   * calculates the correction progress
   */
  calculateProgress() {
    return (this.corrections.reduce((counter, currentValue) => counter + (currentValue[0].status == "in_progress" ? 1 : 0), 0) / (this.questionsWithAVG.length * this.students.length)) * 100;
  }

  /**
   * starts the correction by redirecting to correction-question
   */
  startCorrection() {
    this.router.navigate(["correction-question"], {state: this.exam})
  }

  /**
   * exports the lsf excel
   */
  exportLSFExcel() {
    this.lsfService.getLsfExcel(this.exam).subscribe((response) => {
        let file = new Blob([response], {type: 'application/vnd.ms-excel'});
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      }
    );
  }

  /**
   * archives the exam
   */
  endCorrection() {
    this.examArchiveService.archiveExam(this.exam).subscribe((response) => {
        this.snackBar.open("Prüfung wurde archiviert!", "Schließen", {duration: 4000});
        this.router.navigate(["/archived-exams"]);
      },
      (error) => {
        this.snackBar.open("Konnte Korrektur nicht abschließen! Bitte erneut versuchen.", "Schließen", {duration: 8000})
      });
  }
}
