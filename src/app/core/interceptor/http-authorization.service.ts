import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { AlertCustomService } from '../service/alert-custom.service';

@Injectable()
export class HttpAuthorizationService implements HttpInterceptor {

  constructor(private alertCustomService:AlertCustomService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    return next.handle(authReq).pipe(
      tap({
        next: (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // This is intentional
          }
        },
        error: (error) => {
          if (error.status === 400) {
            //This is intentional            
          }
          this.alertCustomService.showAlert(error?.message || "Error en el servidor.", 'danger');
        }
      })
    );
  }

}
