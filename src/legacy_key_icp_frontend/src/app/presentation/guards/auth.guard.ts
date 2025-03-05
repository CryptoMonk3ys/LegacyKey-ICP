import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../data/service/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.getAccountAddress() == null) {
      return this.router.parseUrl('/connect');
    }
    return true;
  }
}
