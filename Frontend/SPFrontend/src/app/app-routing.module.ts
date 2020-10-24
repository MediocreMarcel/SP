import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DummyAppComponent} from './components/dummy-app/dummy-app.component';
import { TestComponent} from './components/test/test.component';

const routes: Routes = [
  { path: 'login', component: DummyAppComponent },
  { path: 'test', component: TestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
