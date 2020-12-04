import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from "../components/models/User";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.BaseUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');


  constructor(private http: HttpClient,
              private router: Router) {
  }

  loginUser(user: User) {
    console.log(user);
    return this.http.post('http://localhost:8080/rest/user/login', JSON.stringify(user), {
      headers: this.headers,
      observe: 'response'
    });
  }
}
