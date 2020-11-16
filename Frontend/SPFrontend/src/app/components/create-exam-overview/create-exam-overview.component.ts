import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-create-exam-overview',
  templateUrl: './create-exam-overview.component.html',
  styleUrls: ['./create-exam-overview.component.css']
})
export class CreateExamOverviewComponent implements OnInit {

  constructor(public dialog: MatDialog) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateExamDialogOverview, {
      width: '500px',

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  ngOnInit(): void {
  }

}


@Component({
  selector: 'app-create-exam-dialog',
  templateUrl: './create-exam-dialog-overview.html',
  styleUrls: ['./create-exam-overview.component.css']
})
export class CreateExamDialogOverview {
  selected: any;

}


