import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import {ArchivedExamsDataSource} from './archived-exams-datasource';
import {ExamArchiveServiceService} from "../../services/exam-archiv/exam-archive-service.service";
import {UserService} from "../../shared/user.service";
import {ExamDTO} from "../models/ExamDTO";
import {Router} from "@angular/router";

@Component({
  selector: 'app-archived-exams',
  templateUrl: './archived-exams.component.html',
  styleUrls: ['./archived-exams.component.css']
})
export class ArchivedExamsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ExamDTO>;
  dataSource: ArchivedExamsDataSource;

  /** Columns displayed in the table.  */
  displayedColumns = ['exam_id', 'title', 'creation_date', 'exam_date', 'totalPoints', 'editButton'];


  public tableData: ExamDTO[] = [];
  constructor(private service: ExamArchiveServiceService, private userService: UserService, private router: Router) {
    this.loadExams();
  }

  /**
   * Get the Data for the Table from backend, where we get every exam with the status 'corrected'.
   * All the Data is saved in the variable tableData. And then loaded into the Table.
   */
  loadExams() {
    this.service.getExamsFromArchivForUser(this.userService.getUser()).subscribe(u => {
      this.tableData = u;
      this.dataSource = new ArchivedExamsDataSource(this.tableData);
      this.loadDataIntoTable();
    });
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  /**
   * With this function we load the Date in the Table, sort client-side and paginate client-side.
   */
  loadDataIntoTable(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  /**
   * Opens the correction Dialog for a exam
   * @param exam exam that should be opened in the correctin view
   */
  editCorrection(exam: ExamDTO) {
    this.router.navigate(["/correction-summery"], {state: exam});
  }
}
