import {Component, OnInit} from '@angular/core';
import {User} from "../models/User";
import {UserService} from "../../shared/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();


  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  login() {
    console.log(this.user.user_id);
    console.log(this.user);
    this.userService.loginUser(this.user).subscribe(
      (response) => {
        console.log('ok');
        console.log(response.body);
      },
      (error) => {
        console.error('Falsche Benutzerdaten');

      });
  }
}
