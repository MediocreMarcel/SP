import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from "./shared/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userSevice: UserService,
              private router: Router) {

  }

  /**
   * This Method checks if the User can access a specific Site.
   * @param route
   * @param state
   * if the User is not logged in then the User will be redirected to the Login Page.
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userSevice.loggedIn === false) {
      this.router.navigate(['login']);
    }
    return this.userSevice.loggedIn;
  }

}
