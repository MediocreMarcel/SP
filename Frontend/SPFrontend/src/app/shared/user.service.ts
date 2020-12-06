import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../components/models/User';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.BaseUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  private loggedInStatus = false;
  private user: User = null;

  constructor(private http: HttpClient,
              private router: Router) {
  }

  setLoggedIn(value: boolean){
    this.loggedInStatus = value;
  }

  setUser(user: User){
    this.user = user;
  }

  get isLoggedIn(){
    return this.loggedInStatus;
  }

  getUser(){
    return this.user;
  }

  loginUser(user: User) {
    console.log(user);
    return this.http.post<User>(this.url + 'user/login', JSON.stringify(user), {
      headers: this.headers,
      observe: 'response'
    });
  }
}
