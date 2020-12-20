import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../shared/user.service";
import {CreateOverviewExamService} from "../../services/create-overview-exam.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-exam-overview',
  templateUrl: './exam-overview.component.html',
  styleUrls: ['./exam-overview.component.css']
})
export class ExamOverviewComponent implements OnInit {
  sortBy: string = "name";
  tiles: ExamDTO[];

  constructor(private service: CreateOverviewExamService, public dialog: MatDialog, private userService: UserService, private router:Router) { }

  ngOnInit(): void {
  }


  loadModules(){
    this.service.getExamsForUser(this.userService.getUser()).subscribe(u => {
      this.tiles = u;
      if (this.tiles.length > 0){
        this.sortChanged();
      }
    });
  }

  navigateToQuestionsCollection(exam: ExamDTO) {
    this.router.navigate(['/questions-collection'], {state: exam});
  }

  public sortChanged() {
    if (this.sortBy === "name") {
      this.tiles.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.sortBy === "platzhalter") {
      this.tiles.sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  openCreateDialog(){
    const dialogRef = this.dialog.open( CreateExamDialog, {
      width: '50%',
      height: '30%'
    });

    dialogRef.afterClosed().subscribe(create => {
      this.loadModules();
    });
  }

 
}




export class ExamDTO {
  exam_id: number;
  name: string;
  creation_date: string;
  exam_date:string;
  status: any;

  constructor(exam_id, name) {
    this.exam_id = exam_id;
    this.name = name;


  }
}
  export class CreateExamDTO{
  exam_id: number;
  name: string;
  creation_date: string ;
  exam_date: string;
  status: any;

  constructor(exam_id,name,creation_date,exam_date ,status) {
    this.exam_id = exam_id;
    this.name = name;
  this.creation_date = creation_date;
  this.exam_date = exam_date;
  this.status = status;
  }


}

@Component({
  selector: 'app-create-module-dialog',
  templateUrl: './exam-overview.create_exam_dialog.html',
  styleUrls: ['./exam-overview.create_exam_dialog.css']
})
export class CreateExamDialog {
  name:string;
  creation_date: string;
  exam_date: string;
  status: any;



  constructor(private service: CreateOverviewExamService, private dialogRef: MatDialogRef<CreateExamDialog>, private userService: UserService) {
  }



  createExam() {
    this.service.createNewExam(new CreateExamDTO(this.name,today,this.exam_date,this.status, this.userService.getUser().user_id));
    this.dialogRef.close();
  }



}


