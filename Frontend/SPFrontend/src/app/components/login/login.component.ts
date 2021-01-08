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

  /*
   *Request for Login. This Method calls the UserService loginUser() Method.
   *if response is 200 the Response body will be subscribed on the current User and the Router will navigate to homepage.
   *After that the Methods setLoggedIn(User) from the UserService will be called to create a Session and setUser(User)
   *to define the User globally.
   *if response is an error the boolean variable hide will be false to show the Error on Display.
   */
  login() {
    this.userService.loginUser(this.user).subscribe(
      res => {
        if (res.status === 200) {
          this.router.navigate(['home']);
          this.user.setUser(res.body.user_id,
            res.body.password,
            res.body.name,
            res.body.surname,
            res.body.mail,
            res.body.token
          );
          this.userService.setLoggedIn(this.user);
          this.userService.setUser(this.user);
        }
      },
      error => {
        this.hide = false;
        console.log(error);
      }
    );
  }
}
