import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ExamDTO} from "../../models/ExamDTO";
import {ExamQuestionDTO} from "../../models/QuestionDto";
import {FileSystemFileEntry, NgxFileDropEntry} from "ngx-file-drop";
import {LsfService} from "../../../services/lsf/lsf.service";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {StudentDTO} from "../../models/StudentDTO";
import {CreateOverviewExamService} from "../../../services/exam/create-overview-exam.service";

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

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private lsfService: LsfService, private examService: CreateOverviewExamService, private snackBar: MatSnackBar) {
    this.exam = data.exam;
    this.examContent = data.questions;
    this.questionPoints = this.examContent.reduce(((previousValue, currentValue) => previousValue + currentValue.questionPoints), 0);
  }

  ngOnInit(): void {
  }


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
    this.examService.startExam(this.exam, this.students);
  }
}
