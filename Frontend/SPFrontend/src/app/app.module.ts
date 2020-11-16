import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {InfoUserDialogComponent, NavbarComponent} from './components/navbar/navbar.component';
import {CreateExamOverviewComponent, CreateExamDialogOverview} from './components/create-exam-overview/create-exam-overview.component';
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {CreateExamComponent, CreateExamQuestionDialog} from './components/create-exam/create-exam.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import { LoginComponent } from './components/login/login.component';
import {MatInputModule} from '@angular/material/input';
import {
  CreateModuleDialog,
  QuestionsOverviewComponent
} from './components/questions-overview/questions-overview.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {UserService} from './shared/user.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InfoUserDialogComponent,
    HomePageComponent,
    QuestionsOverviewComponent,
    CreateModuleDialog,
    LoginComponent,
    HomePageComponent,
    CreateExamOverviewComponent,
    CreateExamDialogOverview,
    CreateExamComponent,
    HomePageComponent,
    CreateExamQuestionDialog,
    QuestionsOverviewComponent,
    CreateModuleDialog
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
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
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule,
    MatCardModule,
    MatGridListModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonToggleModule

  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
