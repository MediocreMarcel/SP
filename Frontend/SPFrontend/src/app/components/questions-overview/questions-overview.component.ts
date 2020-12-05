import {Component, OnInit, ViewChild} from '@angular/core';
import {QuestionsOverviewService} from "../../services/questions-overview-service.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-questions-overview',
  templateUrl: './questions-overview.component.html',
  styleUrls: ['./questions-overview.component.css']
})
export class QuestionsOverviewComponent implements OnInit {

  sortBy: string = "definition";
  tiles: ModuleDTO[];


  constructor(private service: QuestionsOverviewService, public dialog: MatDialog) {
    this.loadModules();
  }

  ngOnInit(): void {

  }

  loadModules(){
    this.service.getModulesForUser({
      "user_id": "0",
      "password": "pw",
      "mail": "mail",
      "name": "Hans-Peter",
      "surname": "Mustermann"
    }).subscribe(u => {
      this.tiles = u;
      if (this.tiles.length > 0){
        this.sortChanged();
      }
    });
  }

  public sortChanged() {
    if (this.sortBy === "definition") {
      this.tiles.sort((a, b) => a.definition.localeCompare(b.definition));
    } else if (this.sortBy === "module") {
      this.tiles.sort((a, b) => a.course.localeCompare(b.course));
    }
  }


  navigateToQuestionsCollection(questionCollectionName: string) {

  }

  openCreateDialog(){
    const dialogRef = this.dialog.open(CreateModuleDialog, {
      width: '50%',
      height: '30%'
    });

    dialogRef.afterClosed().subscribe(create => {
        this.loadModules();
    });
  }
}

export class ModuleDTO {
  module_id: number;
  course: string;
  definition: string;

  constructor(module_id, course, definition) {
    this.module_id = module_id;
    this.course = course;
    this.definition = definition;
  }
}

export class CreateModuleDTO {
  course: string;
  definition: string;
  user_id: number;

  constructor(course, definition, user_id) {
    this.course = course;
    this.definition = definition;
    this.user_id = user_id;
  }
}

@Component({
  selector: 'app-create-module-dialog',
  templateUrl: './question-overview.create_module_dialog.html',
  styleUrls: ['./questions-overview.create_module_dialog.css']
})
export class CreateModuleDialog {
  moduleName: string;
  courseName: string;


  constructor(private service: QuestionsOverviewService, private dialogRef: MatDialogRef<CreateModuleDialog>) {
  }

  createModule() {
    this.service.createNewModule(new CreateModuleDTO(this.courseName, this.moduleName, 0));
    this.dialogRef.close();
  }
}
