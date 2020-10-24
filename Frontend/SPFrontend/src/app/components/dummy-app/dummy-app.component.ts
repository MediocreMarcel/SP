import { Component, OnInit } from '@angular/core';
import { DummyAppService} from '../../services/dummy-app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dummy-app',
  templateUrl: './dummy-app.component.html',
  styleUrls: ['./dummy-app.component.css']
})
export class DummyAppComponent implements OnInit {
  hide = true;
  username = '';
  password = '';
  result;
  dialog = false;

  constructor(private service: DummyAppService,
              private router: Router) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
 async login() {
    if (this.username.match('test') && this.password.match('test')) {
      this.service.getUrl().subscribe((data) => {
        this.result = data;
      });
    } else {
      this.dialog = true;
    }
  }
  click() {
    this.router.navigate(['/test']);
  }
}
