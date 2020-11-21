import {Component, OnInit, ViewChild} from '@angular/core';
import {QuestionsOverviewService} from "../../services/questions-overview-service.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-questions-overview',
  templateUrl: './questions-overview.component.html',
  styleUrls: ['./questions-overview.component.css']
})
export class QuestionsOverviewComponent implements OnInit {

  sortBy: string = "definition";
  tiles: ModuleDTO[];


  constructor(private service: QuestionsOverviewService, public dialog: MatDialog) {
    service.sendModuleToDB({
      "username": "0",
      "password": "pw",
      "mail": "mail",
      "name": "Hans-Peter",
      "surname": "Mustermann"
    }).subscribe(u => {
      this.tiles = u;
      this.sortChanged();
    });
  }

  ngOnInit(): void {
    this.sortChanged()
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
      width: '250px',

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

export class ModuleDTO {
  module_id: number;
  course: string;
  definition: string;
}
