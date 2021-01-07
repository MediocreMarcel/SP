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

  constructor(private service: CreateOverviewExamService, public dialog: MatDialog, private userService: UserService, private router: Router) {
    this.loadExams();
  }

  ngOnInit(): void {
  }

  loadExams() {
    this.service.getExamsForUser(this.userService.getUser()).subscribe(u => {

      this.tiles = u;
      if (this.tiles.length > 0) {
        this.sortChanged();
      }
    });
  }

  navigateToQuestionsCollection(exam: ExamDTO) {
    this.router.navigate(['/questions-collection'], {state: exam});
  }

  public sortChanged() {
    if (this.sortBy === "name") {
      this.tiles.sort((a, b) => a.title.localeCompare(b.title));
    } else if (this.sortBy === "module") {
      this.tiles.sort((a, b) => a.module.definition.localeCompare(b.module.definition));
    }
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(CreateExamDialog, {
      width: '50%',
      height: '30%'
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
  JSON:JSON;


  constructor(private service: CreateOverviewExamService, private dialogRef: MatDialogRef<CreateExamDialog>, private userService: UserService, private moduleService: ModuleService) {
  this.JSON = JSON;
    moduleService.getModulesForUser(this.userService.getUser()).subscribe(modules => this.available_modules = modules);
  }

  createExam() {

    this.service.createNewExam(new CreateExamDTO(this.title, new Date().getTime(), Date.parse(this.exam_date), this.userService.getUser(), JSON.parse(this.selectedModule)));
    this.dialogRef.close();
  }

}


