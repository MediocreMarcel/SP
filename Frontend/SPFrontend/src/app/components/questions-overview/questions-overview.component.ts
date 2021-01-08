import {Component, OnInit} from '@angular/core';
import {ModuleService} from "../../services/module/module.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../shared/user.service";
import {Router} from "@angular/router";
import {CreateModuleDTO, ModuleDTO} from "../models/ModuleDTO";
import {CourseDTO} from "../models/CourseDTO";
import {CourseService} from "../../services/course/course.service";

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

  /**
   * loads all modules that the owner has access to
   */
  loadModules(){
    this.service.getModulesForUser(this.userService.getUser()).subscribe(u => {
      this.tiles = u;
      if (this.tiles.length > 0){
        this.sortChanged();
      }
    });
  }

  /**
   * sorts the modules by selection in the toggle button
   */
  public sortChanged() {
    if (this.sortBy === "definition") {
      this.tiles.sort((a, b) => a.definition.localeCompare(b.definition));
    } else if (this.sortBy === "module") {
      this.tiles.sort((a, b) => a.course.courseName.localeCompare(b.course.courseName));
    }
  }

  /**
   * opens a module
   * @param module module that should be opened
   */
  navigateToQuestionsCollection(module: ModuleDTO) {
    this.router.navigate(['/questions-collection'], {state: module});
  }

  /**
   * opens create dialog
   */
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
  selectedCourse: string;
  courses: CourseDTO[] = [];
  JSON = JSON;


  constructor(private moduleService: ModuleService, private dialogRef: MatDialogRef<CreateModuleDialog>, private userService: UserService, private courseService: CourseService) {
    courseService.getAllCourses().subscribe( u => this.courses = u);
  }

  /**
   * creates a Module if create button is pressed
   */
  createModule() {
    this.moduleService.createNewModule(new CreateModuleDTO(JSON.parse(this.selectedCourse), this.moduleName, this.userService.getUser().user_id));
    this.dialogRef.close();
  }
}
