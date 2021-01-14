import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {UserService} from "../../shared/user.service";
import {timer} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent implements OnInit {

  disabeledButtonsArray = [];

  constructor(public dialog: MatDialog,
              private router: Router,
              private elem: ElementRef,
              private userService: UserService) {
  }

  /**
   *This Method will open the edit Profile Dialog.
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(InfoUserDialogComponent, {
      width: '750px',
      height: '750px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  /**
   *This Method is for the Logout of the User.
   */
  logout(): void {
    this.userService.logout();
    this.router.navigate(['login']);
  }

  /**
   *THis Mehtod checks the URL on which site the User is to disable the Button.
   */
  checkRouterURL(): void {
    if (this.router.url === '/exam-overview') {
      this.disabeledButtonsArray[0] = true;
    }
  }

  createExam(): void {
    this.router.navigate(['/exam-overview']);
  }

  correctExam(): void {
    this.router.navigate(['/correction-overview']);
  }

  archiveExam(): void {
    this.router.navigate(['/archived-exams']);
  }

  createQuestions(): void {
    this.router.navigate(['/questions-overview']);
  }

  redirectToHome(): void {
    this.router.navigate(['/home']);
  }

  ngOnInit(): void {
    const elements = this.elem.nativeElement.querySelectorAll('.navButton');
    for (var i = 0; i < elements.length; i++) {
      this.disabeledButtonsArray.push(false);
    }
    this.checkRouterURL();
  }
}


@Component({
  selector: 'app-info-user-dialog',
  templateUrl: 'info_user_dialog.html',
  styleUrls: ['./navbar.component.css']
})
export class InfoUserDialogComponent {
  constructor(public dialogRef: MatDialogRef<NavbarComponent>) {
  }

  onClose(): void {
    this.dialogRef.close();
  }
}


