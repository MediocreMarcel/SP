import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../shared/user.service";
import {CreateOverviewExamService} from "../../../services/exam/create-overview-exam.service";
import {Router} from "@angular/router";
import {DeleteExamDTO} from "../../models/DeleteExamDTO";

@Component({
  selector: 'app-delete-exam-dialog',
  templateUrl: 'delete-exam.exam-editor.component.html'
})
export class DeleteExamDialog {
  moduleName: string;



  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<DeleteExamDialog>, private userService: UserService, private router: Router, private examService: CreateOverviewExamService) {

  }

  /**
   * deletes Exam
   */
  deleteExam() {
    this.examService.deleteExam(new DeleteExamDTO(this.data.exam, this.userService.getUser())).subscribe( u => {
      this.dialogRef.close();
      this.router.navigate(['/exam-overview']);
    });
  }

  /**
   * close dialog
   */
  abort() {
    this.dialogRef.close();
  }
}
