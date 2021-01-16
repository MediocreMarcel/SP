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

  /**
   * Navigates to the correction view. Passes the current exam
   * @param exam exam which should be corrected
   */
  navigateToCorrection(exam: ExamDTO) {
    this.router.navigate(['/correction-summery'], {state: exam});
  }

  /**
   * Here we load the Exams from the Backend where the State is in 'in_correction'.
   * Also sortChanged get called, this function sort the Objects which are saved in tiles.
   */
  loadExams() {
    this.service.getExamsforCorrection(this.userService.getUser()).subscribe(u => {

      this.tiles = u;
      if (this.tiles.length > 0) {
        this.sortChanged();
      }
    });
  }

  /**
   * sortChanged is a function wich sort the Array tiles.
   */
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
