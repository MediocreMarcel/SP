import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateModuleComponent} from "./components/create-module/create-module.component";
import {HomePageComponent } from "./components/home-page/home-page.component";
import  {TestComponent} from "./components/test/test.component";




const routes: Routes = [
  {path: 'Create-Module', component: CreateModuleComponent} /*http://localhost:4200/Create-Module*/
  {path: 'home-page', component: HomePageComponent},
  {path: 'test-page', component: TestComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
