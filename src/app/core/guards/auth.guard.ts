import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../service/session.service';

/**
 * Guard to check if the user has a session.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private sessionService: SessionService) {}

  /**
   * Check if the user has a session.
   *
   * If the user does not have a session, it will be redirected to the login page.
   *
   * @param route The route.
   * @param state The state.
   * @returns True if the user has a session, false otherwise.
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const hasSession = this.sessionService.hasSession;
    if (!hasSession) {
      this.sessionService.close();
    }

    return hasSession;
  }
}
