import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CreateModuleComponent} from './components/create-module/create-module.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatGridListModule} from '@angular/material/grid-list';
import {HomePageComponent } from './components/home-page/home-page.component';
import {TestComponent } from './components/test/test.component';
import {MatButtonModule} from '@angular/material/button';
import {CreateModuleService} from "./services/create-module.service";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
    CreateModuleComponent,
    HomePageComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatGridListModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [CreateModuleService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
