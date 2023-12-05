import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SecurityService } from '../../services/security.service';
import { SessionService } from 'src/app/core/service/session.service';
import { AlertCustomService } from 'src/app/core/service/alert-custom.service';
import { finalize } from 'rxjs';

/**
 * A page that allows the user to login.
 * This page is only available if the user is not logged in.
 */
@Component({
  templateUrl: './login.page.html',
})
export class LoginPage {
  /**
   * The login form group.
   */
  public readonly loginForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.maxLength(100)]],
    password: ['', [Validators.required, Validators.maxLength(100)]],
  });

  /**
   * Indicates whether the login is loading.
   */
  public loading = false;

  /**
   * Initializes a new instance of the LoginPage class.
   *
   * @param formBuilder The form builder.
   * @param securityService  The security service.
   * @param sessionService The session service.
   * @param alertCustomService The alert custom service.
   */
  constructor(
    private formBuilder: FormBuilder,
    private securityService: SecurityService,
    private sessionService: SessionService,
    private alertCustomService: AlertCustomService
  ) {
    if (this.sessionService.hasSession) {
      this.sessionService.goToHome();
    }
  }

  /**
   * Performs the login.
   *
   * If the login is invalid, an alert is displayed.
   *
   * If the login is successful, the session is initialized.
   */
  login() {
    if (this.loginForm.invalid) {
      this.alertCustomService.showAlert(
        'Por favor, ingrese un usuario y contraseña.',
        'danger'
      );
      return;
    }

    this.loginForm.disable();
    this.loading = true;

    this.securityService
      .login(this.loginForm.value.username!, this.loginForm.value.password!)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((response) => {
        if (response.success) {
          this.alertCustomService.showAlert(
            'Inicio de sesión exitoso.',
            'success'
          );

          setTimeout(() => {
            this.sessionService.init(response.token!);
          }, 1000);
        } else {
          this.loginForm.enable();
          this.alertCustomService.showAlert(
            'Usuario o contraseña incorrectos.',
            'danger'
          );
        }
      });
  }
}
