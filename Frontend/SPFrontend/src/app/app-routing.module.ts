import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent } from "./components/home-page/home-page.component";
import  {TestComponent} from "./components/test/test.component";

const routes: Routes = [
  {path: 'home-page', component: HomePageComponent},
  {path: 'test-page', component: TestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
