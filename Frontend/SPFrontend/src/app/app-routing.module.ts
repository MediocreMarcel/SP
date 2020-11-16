import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomePageComponent} from './components/home-page/home-page.component';
import {QuestionsOverviewComponent} from './components/questions-overview/questions-overview.component';
import {LoginComponent} from './components/login/login.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'home', component: HomePageComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'questions-overview', component: QuestionsOverviewComponent, canActivate: [AuthGuard]},
  {path: 'questions-overview', component: QuestionsOverviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
