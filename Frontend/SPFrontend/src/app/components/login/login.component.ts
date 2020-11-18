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
  hide = true;


  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  login() {
    console.log(this.user.user_id);
    console.log(this.user);
    this.userService.loginUser(this.user).subscribe(
      res => {
        if (res.status === 200) {
          this.router.navigate(['home']);
          this.userService.setLoggedIn(true);
          this.user.setUser(res.body.user_id,
            res.body.password,
            res.body.name,
            res.body.surname,
            res.body.mail
          );
          console.log(this.user);
        }
      },
      error => {
        this.hide = false;
        console.log(error);
      }
    );
  }
}
