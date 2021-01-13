import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ExamDTO} from "../../models/ExamDTO";
import {ExamQuestionDTO} from "../../models/QuestionDto";
import {FileSystemFileEntry, NgxFileDropEntry} from "ngx-file-drop";
import {LsfService} from "../../../services/lsf/lsf.service";

@Component({
  selector: 'app-start-exam',
  templateUrl: './start-exam.component.html',
  styleUrls: ['./start-exam.component.css']
})
export class StartExamComponent implements OnInit {

  exam: ExamDTO;
  examContent: ExamQuestionDTO[];
  questionPoints: number = -1;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private lsfService: LsfService) {
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

        const formData = new FormData()
        formData.append('excel', file, droppedFile.relativePath);

        this.lsfService.uploadLsfParticipantList(formData).subscribe();

      });
    }

  }
}
