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
  private user: User = null;

  constructor(private http: HttpClient,
              private router: Router) {
  }

  /**
   *This Method will create a Session to keep the User logged in.
   * @param user is the User which is coming from the Backend
   */
  setLoggedIn(user: User) {
    localStorage.setItem('access_token', user.token);
  }

  /**
   *This Method will get the created Session.
   * @return is a boolean.
   */
  get loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }

  /**
   *This Method will set the User.
   * @param user which comes from the Backend.
   */
  setUser(user: User) {
    this.user = user;
  }

  /**
   * This Mehtod will get the current User.
   */
  getUser(): User {
    return this.user;
  }

  /**
   * This Mehthod will send a Post Request to the Backend and Returns a Response.
   * @param user with the credentials only.
   * The Response will be 200 with a User in the Response body or 401 Forbidden.
   */
  loginUser(user: User) {
    return this.http.post<User>(this.url + 'user/login', JSON.stringify(user), {
      headers: this.headers,
      observe: 'response'
    });
  }

  /**
   *This Method is for the Logout. The current Session will be deleted.
   */
  logout() {
    localStorage.removeItem('access_token');
  }
}
