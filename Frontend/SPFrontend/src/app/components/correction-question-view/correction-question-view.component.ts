import {Component, OnInit} from '@angular/core';
import {ExamDTO} from "../models/ExamDTO";
import {ModuleDTO} from "../models/ModuleDTO";
import {CourseDTO} from "../models/CourseDTO";
import {CreateQuestionService} from "../../services/question/create-question.service";
import {QuestionWithEvaluationCriteriasDTO} from "../models/QuestionDto";
import {CorrectionDTO} from "../models/CorrectionDTO";
import {CorrectionService} from "../../services/correction/correction.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-correction-question-view',
  templateUrl: './correction-question-view.component.html',
  styleUrls: ['./correction-question-view.component.css']
})
export class CorrectionQuestionViewComponent implements OnInit {
  //Variables containing not changeable information
  exam: ExamDTO;
  questions: QuestionWithEvaluationCriteriasDTO[] = [];
  students: number[] = [];

  //local storage of corrections
  availableCorrections: CorrectionDTO[][] = [];

  //variables containing the information that is currently displayed
  currentQuestion: QuestionWithEvaluationCriteriasDTO = null;
  currentCorrection: CorrectionDTO[] = [];
  //indexes of the current displayed information in relation to the constant variables
  currentStudentIndex: number = 0;
  currentQuestionIndex: number = 0;

  //variables for the html table
  tableHeader = ["RatingCriteria", "MaxPoints", "scoredPoints", "fullPointsCheckpoints"];
  tableFooter = ["RatingCriteria", "MaxPoints", "scoredPoints"];

  //variables that contain the jump value from the html. Contain the values to which the correction should jump in the jumpTo method
  jumpToQuestionId: number = -1;
  jumpToUser: number = -1;

  /**
   * Constructor, gets the required services and modules from angular via constructor injection
   * @param questionService
   * @param correctionService
   * @param snackBar
   */
  constructor(private questionService: CreateQuestionService, private correctionService: CorrectionService, private snackBar: MatSnackBar, private router:Router) {
  }

  /**
   * loads the required data from the browser storage and the db
   */
  ngOnInit(): void {
    //Loads and saves exam
    let state = history.state;
    delete state.navigationId;
    this.exam = state;
    if (this.exam == undefined) {
      let moduleJSON = localStorage.getItem("currentCorrectionExam");
      if (moduleJSON == null) {
        this.router.navigate(["/correction-overview"]);
        return;
      }
      this.exam = JSON.parse(moduleJSON);
    } else {
      localStorage.setItem("currentCorrectionExam", JSON.stringify(this.exam));
    }

    this.correctionService.getCorrection(this.exam).subscribe(u => {
      this.availableCorrections = u;
      console.log(this.availableCorrections);
      //fill students array
      var studentSet = new Set();
      this.availableCorrections.forEach(u => studentSet.add(u[0].matrNr));
      // @ts-ignore
      studentSet.forEach(u => this.students.push(u));

      //load questions
      this.questionService.getQuestionsWithRatingCriteriaFromDb(this.exam).subscribe(u => {
        u.sort((a, b) => a.position - b.position);//sort by position
        this.questions = u;
        console.log(this.questions);
        this.currentQuestion = this.questions[0];
        this.loadCorrection();
      });
    });
  }

  /**
   * calculates the total points of the current correction in the evaluation table
   */
  totalPointsEval() {
    if (this.currentCorrection.length <= 0) {
      return 0;
    }
    return this.currentCorrection.map(a => a.reachedPoints).reduce(function (a, b) {
      return a + b;
    });
  }

  /**
   * gives full points to a evaluation criteria if a checkbox is checked
   * @param element index of evaluation criteria
   * @param checked boolean if checkbox is checked or unchecked
   */
  fullPoints(element: number, checked: boolean) {
    if (checked) {
      this.currentCorrection[element].reachedPoints = this.currentQuestion.evaluationCriterias[element].points;
    } else {
      this.currentCorrection[element].reachedPoints = 0;
    }

  }

  /**
   * saves the current correction and skips to the next student to correct. Also
   * calls nextQuestion if necessary
   */
  nextStudent() {
    this.saveCurrentCorrection();
    this.currentStudentIndex++;
    //check if overflown
    if (this.currentStudentIndex >= this.students.length) {
      this.currentStudentIndex = 0;
      this.nextQuestion();
    }
    this.loadCorrection();

  }

  /**
   * saves the correction to the local storage (availableCorrections) and the db
   */
  saveCurrentCorrection() {
    //Add Comment to all corrections
    this.currentCorrection.forEach(u => u.comment = this.currentCorrection[0].comment);
    //change status
    this.currentCorrection.forEach(u => u.status = "in_progress");

    //if list does not contain current question
    if (this.availableCorrections.length == 0 || this.availableCorrections.find(u => u[0].questionId == this.currentQuestion.questionId && u[0].matrNr == this.students[this.currentStudentIndex]) == undefined) {
      this.availableCorrections.push(this.currentCorrection);
    } else { // if list contains current question replace it
      let index = this.availableCorrections.findIndex(u => u[0].questionId == this.currentQuestion.questionId && u[0].matrNr == this.students[this.currentStudentIndex]);
      this.availableCorrections[index] = this.currentCorrection;
    }

    //Save to db and inform user
    this.correctionService.saveCorrection(this.currentCorrection).subscribe((response) => {
        this.snackBar.open("Bewertung gespeichert!", "Schließen", {duration: 4000})
      },
      (error) => {
        this.snackBar.open("Letze Bewertung konnte nicht gespeichert werden!", "Schließen", {duration: 8000})
      });
  }

  /**
   * clears the correction and creates new objects for all evaluation criteria of the current Question to correct
   */
  clearCurrentCorrection() {
    this.currentCorrection = [];
    this.currentQuestion.evaluationCriterias.forEach((u, i) => this.currentCorrection.push(new CorrectionDTO(this.currentQuestion.questionId, this.currentQuestion.evaluationCriterias[i], this.students[this.currentStudentIndex], "", 0, "in_progress", this.exam.exam_id)));
  }

  /**
   * loads the next question.
   */
  nextQuestion() {
    this.currentQuestionIndex++;
    //check if correction is done
    if (this.currentQuestionIndex >= this.questions.length) {
      console.log("correction finished");
      this.currentQuestionIndex--;
      //TODO what to do if finished correction
      return;
    }
    this.currentQuestion = this.questions[this.currentQuestionIndex];
  }

  /**
   * loads the previous student, saves the current correction and prevents underflow of current student
   */
  previousStudent() {
    this.saveCurrentCorrection();
    this.currentStudentIndex--;
    //check for underflow
    if (this.currentStudentIndex < 0) {
      if (this.previousQuestion()) {//if underflow and there is a previous question set the student index to max and reduce the question index
        this.currentStudentIndex = this.students.length - 1;
      } else { //restore old value
        this.currentStudentIndex++;
      }
    }
    this.loadCorrection();

  }

  /**
   * loads the previous question. Prevents underflow of current question.
   * @return boolean if previous question could be loaded
   */
  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
      return true;
    }
    return false;
  }

  /**
   * loads the correction of the current question and student index from the local storage (availableCorrections)
   * if not found it checks if the db contains this correction. If not it creates a new one.
   */
  private loadCorrection() {
    //check if correction is in local storage
    let foundCorrection = this.availableCorrections.find(u => u[0].questionId == this.currentQuestion.questionId && u[0].matrNr == this.students[this.currentStudentIndex]);
    if (foundCorrection == undefined) {//if not in localstorage, load the correction from db
      this.snackBar.open("Etwas ist schiefgelaufen. Bitte Korrektur neu laden!")
    } else {
      this.currentCorrection = foundCorrection;//if correction is in localstorage, load it
      this.currentCorrection.forEach(u => {
        if (u.reachedPoints == undefined) {
          u.reachedPoints = 0;
        }
      });

    }

  }

  /**
   * jumps to a correction by a question and student. This method uses the variables jumpToQuestionId and
   * jumpToUser. These Variables are set by the html.
   */
  jumpTo() {
    this.currentQuestionIndex = this.jumpToQuestionId;
    this.currentQuestion = this.questions[this.currentQuestionIndex];
    this.currentStudentIndex = this.jumpToUser;
    this.loadCorrection()
  }

  /**
   * calculates the progress of the correction
   * @return percent value of the currection progress
   */
  getCorrectionProgress() {
    let availableCorrections = this.availableCorrections.reduce((a,b) => a + b.reduce((aInner,bInner) => aInner+1,0),0);
    let correctedCorrections = this.availableCorrections.reduce((a,b) => a + b.reduce((aInner,bInner) => aInner+(bInner.status=="in_progress"?1:0),0),0);
    return correctedCorrections/availableCorrections*100;
  }

  /**
   * get the sum of the achieved points of a student as a string in the format x from y points
   * @return string of the current points from a student
   */
  getSumOfPointsFromStudent() {
    let sum = 0;
    this.availableCorrections.forEach(u => {
      if (u[0].matrNr == this.students[this.currentStudentIndex]) {
        sum += u.reduce((accumulator, current) => accumulator + current.reachedPoints, 0);
      }
    });
    return sum + " von " + this.exam.totalPoints;
  }

  /**
   * saves the exam and leaves
   */
  saveAndLeave() {
    this.saveCurrentCorrection();
    this.router.navigate(["/home"]);
  }
}
