import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, catchError, tap } from 'rxjs';
import { AlertCustomService } from '../service/alert-custom.service';
import { SessionService } from '../service/session.service';

/**
 * Interceptor to add the authorization header to the requests.
 */
@Injectable()
export class HttpAuthorizationService implements HttpInterceptor {
  /**
   * Constructor of the class.
   *
   * @param alertCustomService The alert custom service.
   * @param sessionService The session service.
   */
  constructor(
    private alertCustomService: AlertCustomService,
    private sessionService: SessionService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;

    if (this.sessionService.hasSession) {
      const token = this.sessionService.token;
      authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
    }

    return next.handle(authReq).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.alertCustomService.showAlert('Su sesión ha expirado.', 'danger');

          this.sessionService.close();
        } else {
          this.alertCustomService.showAlert(
            'Error al realizar la petición. Por favor, intente nuevamente.',
            'danger'
          );
        }
        return EMPTY;
      })
    );
  }
}
