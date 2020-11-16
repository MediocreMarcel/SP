import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateModuleComponent} from "./components/create-module/create-module.component";

const routes: Routes = [
  {path: 'Create-Module', component: CreateModuleComponent} /*http://localhost:4200/Create-Module*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
