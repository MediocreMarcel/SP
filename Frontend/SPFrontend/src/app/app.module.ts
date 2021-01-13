import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomePageComponent} from './components/home-page/home-page.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InfoUserDialogComponent, NavbarComponent} from './components/navbar/navbar.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {
  CreateModuleDialog,
  QuestionsOverviewComponent
} from './components/questions-overview/questions-overview.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MAT_DATE_LOCALE, MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {QuestionsCollectionComponent} from "./components/questions-collection/questions-collection.component";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {GroupByPipe} from "./components/pipes/group-by.pipe";
import {LoginComponent} from "./components/login/login.component";
import {UserService} from "./shared/user.service";
import {CreateExamDialog, ExamOverviewComponent} from './components/exam-overview/exam-overview.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {DatePipe} from "@angular/common";
import {ExamEditorComponent} from './components/exam-editor/exam-editor.component';
import {DeleteExamDialog} from "./components/exam-editor/deleteExam/delete-examen.exam-editor";
import {ArchivedExamsComponent} from "./components/archived-exams/archived-exams.component";
import { QuillModule } from 'ngx-quill';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {CreateQuestionDialog} from "./components/questions-collection/create_question/questions-collection.create_question_dialog";
import { StartExamComponent } from './components/exam-editor/start-exam/start-exam.component';
import {NgxFileDropModule} from "ngx-file-drop";
import { CorrectionQuestionViewComponent } from './components/correction-question-view/correction-question-view.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InfoUserDialogComponent,
    QuestionsCollectionComponent,
    QuestionsOverviewComponent,
    CreateModuleDialog,
    LoginComponent,
    HomePageComponent,
    GroupByPipe,
    ExamOverviewComponent,
    CreateExamDialog,
    ArchivedExamsComponent,
    CreateQuestionDialog,
    ExamEditorComponent,
    DeleteExamDialog,
    StartExamComponent,
    CorrectionQuestionViewComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatGridListModule,
        MatCardModule,
        MatButtonToggleModule,
        HttpClientModule,
        FormsModule,
        MatOptionModule,
        MatSelectModule,
        MatExpansionModule,
        MatCheckboxModule,
        MatProgressBarModule,
        DragDropModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDialogModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        ReactiveFormsModule,
        QuillModule.forRoot(),
        MatSnackBarModule,
        MatTableModule,
        NgxFileDropModule,
    ],
  providers: [
    UserService,
    {provide: MAT_DATE_LOCALE, useValue: 'de-DE'},
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
