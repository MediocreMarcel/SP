import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent implements OnInit {

  disabeledButtonsArray = [];

  constructor(public dialog: MatDialog,
              private router: Router,
              private elem: ElementRef) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(InfoUserDialogComponent, {
      width: '750px',
      height: '750px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  checkRouterURL(): void {

    if (this.router.url === '/test') {
      this.disabeledButtonsArray[0] = true;
      this.disabeledButtonsArray[1] = true;
      this.disabeledButtonsArray[2] = true;
      this.disabeledButtonsArray[3] = true;
    }
  }

  createExam(): void {
    this.router.navigate(['/exam-overview']);
  }

  correctExam(): void {
    this.router.navigate(['/test']);
  }

  archiveExam(): void {
    this.router.navigate(['/test']);
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
    console.log(this.disabeledButtonsArray);
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


