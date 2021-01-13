import { Component, OnInit } from '@angular/core';
import {ExamDTO} from "../models/ExamDTO";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../shared/user.service";
import {Router} from "@angular/router";
import {CorrectionOverviewExamService} from "../../services/correction-exam/correction-overview-exam.service";

@Component({
  selector: 'app-correction-overview',
  templateUrl: './correction-overview.component.html',
  styleUrls: ['./correction-overview.component.css']
})
export class CorrectionOverviewComponent implements OnInit {
  sortBy: string = "name";
  tiles: ExamDTO[];

  constructor(private service: CorrectionOverviewExamService, public dialog: MatDialog, private userService: UserService, private router: Router) {
    this.loadExams();
  }

  navigateToExamEditor(exam: ExamDTO) {
    this.router.navigate(['/exam-corrector'], {state: exam});
  }

  loadExams() {
    this.service.getExamsforCorrection(this.userService.getUser()).subscribe(u => {

      this.tiles = u;
      if (this.tiles.length > 0) {
        this.sortChanged();
      }
    });
  }

  public sortChanged() {
    if (this.sortBy === "name") {
      this.tiles.sort((a, b) => a.title.localeCompare(b.title));
    } else if (this.sortBy === "module") {
      this.tiles.sort((a, b) => a.module.definition.localeCompare(b.module.definition));
    }
  }

  ngOnInit(): void {
  }

}
