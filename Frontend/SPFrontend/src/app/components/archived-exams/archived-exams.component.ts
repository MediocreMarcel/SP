import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import {ArchivedExamsDataSource} from './archived-exams-datasource';
import {ExamArchiveServiceService} from "../../services/exam-archiv/exam-archive-service.service";
import {UserService} from "../../shared/user.service";
import {ExamDTO} from "../models/ExamDTO";

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

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['exam_id', 'title', 'creation_date', 'exam_date', 'total_points',  ];


  public EXAMPLE_DATA: ExamDTO[];
  constructor(private service: ExamArchiveServiceService, private userService: UserService ) {
    this.loadExams();

    console.log(this.EXAMPLE_DATA);

  }

  loadExams() {
    this.service.getExamsFromArchivForUser(this.userService.getUser()).subscribe(u => {


       this.EXAMPLE_DATA = u;
      this.dataSource = new ArchivedExamsDataSource(this.EXAMPLE_DATA);
      this.loadDataIntoTable()
    });
  }

  ngOnInit() {



  }

  ngAfterViewInit() {

  }

  loadDataIntoTable(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
