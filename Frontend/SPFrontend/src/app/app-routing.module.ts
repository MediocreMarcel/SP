import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewModuleComponent} from "./components/new-module/new-module.component";

const routes: Routes = [
  {path: 'New-Module', component: NewModuleComponent} /*http://localhost:4200/New-Module*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
