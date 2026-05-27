import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CanDeactivateGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAllowed = this.checkPermission(route, state);

    if (!isAllowed) {
      console.warn('CanDeactivateGuard: Access denied');
      return this.router.createUrlTree(['/unauthorized'], {
        queryParams: { returnUrl: state.url },
      });
    }

    return true;
  }

  private checkPermission(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Implement your permission logic here
    // This is a mock implementation
    const randomCheck = Math.random() > 0.2;

    if (randomCheck) {
      console.log('CanDeactivateGuard: Access granted for', state.url);
    }

    return randomCheck;
  }
}
