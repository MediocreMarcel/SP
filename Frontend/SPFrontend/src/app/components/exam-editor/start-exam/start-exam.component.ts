import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ExamDTO} from "../../models/ExamDTO";
import {ExamQuestionDTO} from "../../models/QuestionDto";
import {FileSystemFileEntry, NgxFileDropEntry} from "ngx-file-drop";
import {LsfService} from "../../../services/lsf/lsf.service";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {StudentDTO} from "../../models/StudentDTO";
import {CreateOverviewExamService} from "../../../services/exam/create-overview-exam.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-start-exam',
  templateUrl: './start-exam.component.html',
  styleUrls: ['./start-exam.component.css']
})
export class StartExamComponent implements OnInit {

  exam: ExamDTO;
  examContent: ExamQuestionDTO[];
  questionPoints: number = -1;

  students: StudentDTO[] = [];

  uploaded: boolean = false;

  /**
   * loads needed Data and gets required modules from angular via constructor injection
   * @param data data from exam editor containing the exam dto and the question dto list
   */
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private lsfService: LsfService, private examService: CreateOverviewExamService, private snackBar: MatSnackBar, private router: Router, private dialogRef: MatDialogRef<StartExamComponent>) {
    this.exam = data.exam;
    this.examContent = data.questions;
    this.questionPoints = this.examContent.reduce(((previousValue, currentValue) => previousValue + currentValue.questionPoints), 0);
  }

  ngOnInit(): void {
  }

  /**
   * Handels the dropped File in the file drop area
   * @param files dropped file
   */
  droppedFile(files: NgxFileDropEntry[]) {
    let droppedFile = files[0];//only accept first file
    if (droppedFile.fileEntry.isFile) {
      const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
      fileEntry.file((file: File) => {

        console.log(file);
        console.log(droppedFile);

        if (file.type !== "application/vnd.ms-excel"){
          this.snackBar.open("Datei muss eine Excel Datei sein!", "Schließen", {duration: 4000});
          return;
        }

        const formData = new FormData()
        formData.append('excel', file, droppedFile.relativePath);
        formData.append('exam', JSON.stringify(this.exam));

        this.lsfService.uploadLsfParticipantList(formData).subscribe((response) => {
            response.forEach(u => this.students.push(u));
            console.log(this.students)
            this.uploaded = true;
          },
          (error) => {
            this.snackBar.open("Fehler beim Konvertieren der Datei. Handelt es sich um die korrekte Excel Datei?", "Schließen", {duration: 8000})
          });

      });
    }

  }

  /**
   * starts the exam with the imported students
   */
  startExam() {
    //adapt points if not same
    this.exam.totalPoints = this.questionPoints;
    this.examService.startExam(this.exam, this.students).subscribe((response) => {
        this.router.navigate(["/home"]);
        this.dialogRef.close();
      },
      (error) => {
        this.snackBar.open("Fehler beim Starten der Klausur. Bitte erneut probieren.", "Schließen", {duration: 6000});
      });
  }
}
