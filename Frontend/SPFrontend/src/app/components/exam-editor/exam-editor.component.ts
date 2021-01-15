import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {ExamQuestionDTO, QuestionDto} from "../models/QuestionDto";
import {CreateQuestionService} from "../../services/question/create-question.service";
import {GroupByPipe} from "../pipes/group-by.pipe";
import {ExamDTO} from "../models/ExamDTO";
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {CreateOverviewExamService} from "../../services/exam/create-overview-exam.service";
import {SaveExamAndQuestionsDTO} from "../models/SaveExamAndQuestionsDTO";
import {MatDialog} from "@angular/material/dialog";
import {DeleteExamDialog} from "./deleteExam/delete-examen.exam-editor";
import {ModuleService} from "../../services/module/module.service";
import {UserService} from "../../shared/user.service";
import {ModuleDTO} from "../models/ModuleDTO";
import {MatSnackBar} from "@angular/material/snack-bar";
import {StartExamComponent} from "./start-exam/start-exam.component";
import {PdfService} from "../../services/pdf/pdf.service";

@Component({
  selector: 'app-create-question',
  templateUrl: './exam-editor.component.html',
  styleUrls: ['./exam-editor.component.css']
})
export class ExamEditorComponent implements OnInit {
  //working variables
  exam: ExamDTO;
  examDateAsString: string;
  dateOfExam: FormControl = null;

  questionPoolByCategoryUnchanged: any[] = [];
  questionPoolByCategory: QuestionDto[][] = [];

  examContent: ExamQuestionDTO[] = [];

  questionCategories: string[] = [];

  availableModules: ModuleDTO[] = [];

  JSON = JSON;

  //header variables
  examTitle = "Unbenannte Klausur"
  currentExamPoints: number;
  selectedModule: string;
  semester: string;
  pdfSrc: any ;


  /**
   * empty constructor. Gets needed services and router
   * @param questionService service to load exam data from db
   * @param router angular router to navigate between pages
   */
  constructor(private questionService: CreateQuestionService, private pdfService: PdfService, private examService: CreateOverviewExamService, private moduleService: ModuleService, private router: Router, private dialog: MatDialog, private userService: UserService, private snackBar: MatSnackBar) {
  }

  /**
   * NgOnInit is used to get the current exam from the previous page and load the needed data
   */
  ngOnInit(): void {
    //get data from previous page
    let state = history.state;
    delete state.navigationId;
    this.exam = state;
    if (this.exam.exam_id == undefined) {
      let examJson = localStorage.getItem("currentExamForExamEditor");
      if (examJson == null) {
        this.router.navigate(["/exam-overview"]);
        return;
      }
      this.exam = JSON.parse(examJson);
    } else {
      localStorage.setItem("currentExamForExamEditor", JSON.stringify(this.exam));
    }


    //load questions
    this.questionService.getQuestionsFromDb(this.exam.module).subscribe(retVal => {
        let pipe = new GroupByPipe();
        pipe.transform(retVal, "category").forEach(u => {
          //crete array with dummy object at first position. This dummy object represents the name of the category
          this.questionPoolByCategory.push([new QuestionDto(-1, u.key, null, null, null, u.key, null)].concat(u.value));
          //push name of category in corresponding array
          this.questionCategories.push(u.key);
        });
        this.questionPoolByCategoryUnchanged = JSON.parse(JSON.stringify(this.questionPoolByCategory));//Copy Array without reference. Yes this is the best method for it (according to best stackoverflow answer).
      }
    );

    //load questions that are already in an exam
    this.questionService.getExamQuestionsFromDb(this.exam).subscribe(retVal => {
      retVal.forEach(questionInExam => {
        this.examContent.push(questionInExam);
        this.examContent.sort((a, b) => a.position - b.position);

        this.questionPoolByCategory.forEach(category => category.forEach((questionInPool, index) => {
          if (questionInPool.questionId == questionInExam.questionId && questionInPool.questionId != -1) {
            category.splice(index, 1);
          }
        }));
      });
      this.calculateCurrentPoints();
      //load preview
      this.loadPreview();
    });

    this.moduleService.getModulesForUser(this.userService.getUser()).subscribe(modules => {
      this.availableModules = modules;
      this.selectedModule = JSON.stringify(this.exam.module);
    });

    this.dateOfExam = new FormControl(new Date(this.exam.exam_date));


  }


  /**
   * Called if something is moved between DragBoxes. Moves the corresponding Values in the arrays
   * @param event Angular drop event
   */
  drop(event: CdkDragDrop<QuestionDto[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (this.questionCategories.includes(event.container.id)) { //if id of drgBox is a name of a question category

        //search in which array the question is located
        let indexOfCategory = this.questionPoolByCategoryUnchanged.map((u, index) => {
          if (u.some(question => ((question.questionId != undefined) && (question.questionId == event.previousContainer.data[event.previousIndex].questionId)))) {
            return index;//returns index if fitting otherwise the result will be undefined
          }
        }).filter(u => u != undefined)[0];//remove undefined and get first element

        //find the old index from this element to sort it right
        let indexOfElement = this.questionPoolByCategoryUnchanged[indexOfCategory].findIndex(question => question.questionId == event.previousContainer.data[event.previousIndex].questionId)

        transferArrayItem(event.previousContainer.data,
          this.questionPoolByCategory[indexOfCategory],
          event.previousIndex,
          indexOfElement);


      } else { //if something is moved into a DrgBox without a fitting id
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      }
      this.calculateCurrentPoints();
    }
  }

  /**
   * calculates the the value of currentExamPoints. The value will be the sum of all points in the exam.
   */
  calculateCurrentPoints() {
    this.currentExamPoints = 0;
    this.examContent.forEach(q => this.currentExamPoints += q.questionPoints);
  }

  /**
   * saves the exam and the questions to the db
   */
  saveExam() {
    this.exam.module = JSON.parse(this.selectedModule);
    this.examContent.forEach((question, index) => question.position = index);
    this.examService.saveExam(new SaveExamAndQuestionsDTO(this.exam, this.examContent)).subscribe((response) => {
        this.snackBar.open("Speichern erfolgreich!", "Schließen", {duration: 4000})
      },
      (error) => {
        this.snackBar.open("Fehler beim Speichern! Bitte erneut versuchen!", "Schließen", {duration: 8000})
      });

  }

  /**
   * Opens the delete exam dialog
   */
  deleteExam() {
    const dialogRef = this.dialog.open(DeleteExamDialog, {
      width: '30%',
      data: {
        exam: this.exam
      }
    });
  }

  /**
   * Opens the start exam dialog
   */
  startExam() {
    this.saveExam();
    const dialogRef = this.dialog.open(StartExamComponent, {
      width: '30%',
      data: {
        exam: this.exam,
        questions: this.examContent
      }
    });
  }

  loadPreview() {
    this.pdfService.previewPDF(new SaveExamAndQuestionsDTO(this.exam, this.examContent)).subscribe((response) => {
        let file = new Blob([response], {type: 'application/pdf'});
        var fileURL = URL.createObjectURL(file);
        //window.open(fileURL);
        this.pdfSrc= fileURL ;
      }
    );
  }
}

