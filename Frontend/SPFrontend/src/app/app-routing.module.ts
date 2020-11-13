import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewModuleComponent} from "./components/new-module/new-module.component";
import {HomePageComponent } from "./components/home-page/home-page.component";
import  {TestComponent} from "./components/test/test.component";




const routes: Routes = [
  {path: 'home-page', component: HomePageComponent},
  {path: 'test-page', component: TestComponent},
  {path: 'New-Module', component: NewModuleComponent} /*http://localhost:4200/New-Module*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
