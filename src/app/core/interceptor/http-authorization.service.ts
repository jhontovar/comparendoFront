import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
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

    const hasSession = this.sessionService.hasSession;

    if (hasSession) {
      const token = this.sessionService.token;
      authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
    }

    const csrfToken = this.sessionService.csrfToken;

    if (csrfToken) {
      authReq = authReq.clone({
        headers: authReq.headers.set('X-CSRF-TOKEN', csrfToken),
      });
    }

    return next.handle(authReq).pipe(
      tap({
        error: (err) => {
          if (err instanceof HttpErrorResponse) {
            console.log(err);
            if (err.status === 401) {
              if (hasSession) {
                this.alertCustomService.showAlert(
                  'Su sesión ha expirado.',
                  'danger'
                );
              } else {
                this.alertCustomService.showAlert(
                  'No tiene permisos para realizar esta acción.',
                  'danger'
                );
              }

              this.sessionService.close();
            } else {
              this.alertCustomService.showAlert(
                'Error al realizar la petición. Por favor, intente nuevamente.',
                'danger'
              );
            }
          }
        },
      })
    );
  }
}
