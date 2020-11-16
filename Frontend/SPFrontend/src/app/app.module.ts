import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { TestComponent } from './components/test/test.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';

import {CreateExamOverviewComponent, CreateExamDialogOverview} from './components/create-exam-overview/create-exam-overview.component';
import {MatOptionModule} from "@angular/material/core";
import {MatSelect, MatSelectModule} from "@angular/material/select";
import { CreateExamComponent } from './components/create-exam/create-exam.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from "@angular/material/grid-list";

@NgModule({
  declarations: [
    AppComponent,
    CreateExamOverviewComponent,
    CreateExamDialogOverview,
    CreateExamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule,
    MatCardModule,
    MatGridListModule,
    MatExpansionModule,
    MatProgressBarModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
