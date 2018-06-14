import {Injectable} from '@angular/core';
import {  ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlSegment} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { AuthenticationService } from './authentication/authentication.service';
import { UserType } from '../models/user.model';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.getCurrentUser() && this.authService.isNotExpired()
        && this.isAuthorized(route.url, this.authService.getRole())) {
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }

  isAuthorized(route: UrlSegment[], userRole: UserType) {
    console.log(`route ${route} | User type ${userRole}`);
    return true; // TODO: authorization logic
  }
}
