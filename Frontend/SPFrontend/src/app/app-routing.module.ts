import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomePageComponent} from './components/home-page/home-page.component';
import {LoginComponent} from './components/login/login.component';
import {AuthGuard} from './auth.guard';
import {QuestionsOverviewComponent} from './components/questions-overview/questions-overview.component';
import {QuestionsCollectionComponent} from "./components/questions-collection/questions-collection.component";
import {ExamEditorComponent} from "./components/exam-editor/exam-editor.component";
import {ExamOverviewComponent} from "./components/exam-overview/exam-overview.component";
import {ArchivedExamsComponent} from "./components/archived-exams/archived-exams.component";
import {CorrectionOverviewComponent} from "./components/correction-overview/correction-overview.component";
import {CorrectionQuestionViewComponent} from "./components/correction-question-view/correction-question-view.component";
import {CorrectionSummeryComponent} from "./components/correction-summery/correction-summery.component";


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'home', component: HomePageComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'questions-overview', component: QuestionsOverviewComponent, canActivate: [AuthGuard]},
  {path: 'questions-collection', component: QuestionsCollectionComponent, canActivate: [AuthGuard]},
  {path: 'exam-overview', component: ExamOverviewComponent, canActivate: [AuthGuard]},
  {path: 'archived-exams', component: ArchivedExamsComponent, canActivate: [AuthGuard]},
  {path: 'exam-editor', component: ExamEditorComponent, canActivate: [AuthGuard]},
  {path: 'correction-overview', component: CorrectionOverviewComponent, canActivate: [AuthGuard]},
  {path: 'correction-question', component: CorrectionQuestionViewComponent, canActivate: [AuthGuard]},
  {path: 'correction-summery', component: CorrectionSummeryComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
