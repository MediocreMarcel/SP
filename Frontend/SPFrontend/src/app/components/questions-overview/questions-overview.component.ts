import {Component, OnInit, ViewChild} from '@angular/core';
import {ModuleService} from "../../services/module/module.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../shared/user.service";
import {Router} from "@angular/router";
import {QuestionDto} from "../models/QuestionDto";
import {CreateModuleDTO, ModuleDTO} from "../models/ModuleDTO";

@Component({
  selector: 'app-questions-overview',
  templateUrl: './questions-overview.component.html',
  styleUrls: ['./questions-overview.component.css']
})
export class QuestionsOverviewComponent implements OnInit {

  sortBy: string = "definition";
  tiles: ModuleDTO[];


  constructor(private service: ModuleService, public dialog: MatDialog, private userService: UserService, private router:Router) {
    this.loadModules();
  }

  ngOnInit(): void {

  }

  loadModules(){
    this.service.getModulesForUser(this.userService.getUser()).subscribe(u => {
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


  navigateToQuestionsCollection(module: ModuleDTO) {
    this.router.navigate(['/questions-collection'], {state: module});
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

@Component({
  selector: 'app-create-module-dialog',
  templateUrl: './create_module/question-overview.create_module_dialog.html',
  styleUrls: ['./create_module/questions-overview.create_module_dialog.css']
})
export class CreateModuleDialog {
  moduleName: string;
  courseName: string;


  constructor(private service: ModuleService, private dialogRef: MatDialogRef<CreateModuleDialog>, private userService: UserService) {
  }

  createModule() {
    this.service.createNewModule(new CreateModuleDTO(this.courseName, this.moduleName, this.userService.getUser().user_id));
    this.dialogRef.close();
  }
}
