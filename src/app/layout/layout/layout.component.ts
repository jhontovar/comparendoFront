import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationStart, Router } from '@angular/router';
import { SessionService } from 'src/app/core/service/session.service';

/**
 * A component that represents the layout of the application.
 */
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  /**
   * Initializes a new instance of the LayoutComponent class.
   *
   * @param sessionService The session service.
   */
  constructor(private sessionService: SessionService) {}

  /**
   * Closes the session.
   */
  public closeSession(): void {
    this.sessionService.close();
  }
}
