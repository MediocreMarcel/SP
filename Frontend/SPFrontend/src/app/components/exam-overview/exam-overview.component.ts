import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../shared/user.service";
import {CreateOverviewExamService} from "../../services/exam/create-overview-exam.service";
import {Router} from "@angular/router";
import {CreateExamDTO, ExamDTO} from "../models/ExamDTO";
import {ModuleService} from "../../services/module/module.service";
import {ModuleDTO} from "../models/ModuleDTO";


@Component({
  selector: 'app-exam-overview',
  templateUrl: './exam-overview.component.html',
  styleUrls: ['./exam-overview.component.css']
})
export class ExamOverviewComponent implements OnInit {
  sortBy: string = "name";
  tiles: ExamDTO[];

  /**
   * starts the loadExam method and receives the needed modules from Angular via constructor injection
   * @param service
   * @param dialog
   * @param userService
   * @param router
   */
  constructor(private service: CreateOverviewExamService, public dialog: MatDialog, private userService: UserService, private router: Router) {
    this.loadExams();
  }

  ngOnInit(): void {
  }

  /**
   * loads all exams for this user from the db
   */
  loadExams() {
    this.service.getExamsForUser(this.userService.getUser()).subscribe(u => {
      this.tiles = u.filter(item =>  item.status=="in_creation");
      if (this.tiles.length > 0) {
        this.sortChanged();
      }
    });
  }

  /**
   * navigates to the exam editor page and passes the current exam
   * @param exam
   */
  navigateToExamEditor(exam: ExamDTO) {
    this.router.navigate(['/exam-editor'], {state: exam});
  }

  /**
   * Resorts the shown exams
   */
  public sortChanged() {
    if (this.sortBy === "name") {
      this.tiles.sort((a, b) => a.title.localeCompare(b.title));
    } else if (this.sortBy === "module") {
      this.tiles.sort((a, b) => a.module.definition.localeCompare(b.module.definition));
    }
  }

  /**
   * Opens the crate a Exam Dialog
   */
  openCreateDialog() {
    const dialogRef = this.dialog.open(CreateExamDialog, {
      width: '50%',
      height: '45%'
    });

    dialogRef.afterClosed().subscribe(create => {
      this.loadExams();
    });
  }

}


@Component({
  selector: 'app-create-module-dialog',
  templateUrl: './create_exam/exam-overview.create_exam_dialog.html',
  styleUrls: ['./create_exam/exam-overview.create_exam_dialog.css']
})
export class CreateExamDialog {

  title: string;
  exam_date: any;
  status: any;
  selectedModule: string;
  available_modules: ModuleDTO[];
  JSON: JSON;
  examPoints: number;

  /**
   * Constructor gets needed data. Also recives needed modules from Angular via constructor instruction
   * @param service
   * @param dialogRef
   * @param userService
   * @param moduleService
   */
  constructor(private service: CreateOverviewExamService, private dialogRef: MatDialogRef<CreateExamDialog>, private userService: UserService, private moduleService: ModuleService) {
    this.JSON = JSON;
    moduleService.getModulesForUser(this.userService.getUser()).subscribe(modules => this.available_modules = modules);
  }

  /**
   * creates a examen and saves it to the db
   */
  createExam() {
    this.service.createNewExam(new CreateExamDTO(this.title, new Date().getTime(), Date.parse(this.exam_date), this.userService.getUser(), this.examPoints, JSON.parse(this.selectedModule)));
    this.dialogRef.close();
  }

}
