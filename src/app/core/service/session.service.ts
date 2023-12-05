import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionModel } from '../model/session.model';

/**
 * Service to manage the session of the user.
 */
@Injectable({
  providedIn: 'root',
})
export class SessionService {
  /**
   * Constant of the key to store the token in the local storage.
   */
  private readonly tokenKey = 'auth-token';

  /**
   * Constructor of the class.
   *
   * @param router The router to navigate to other pages.
   */
  constructor(private router: Router) {}

  /**
   * Check if there is a session.
   *
   * @returns True if there is a session, false otherwise.
   */
  public get hasSession(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  /**
   * Get the token from the current session.
   *
   * @throws Error if no token is found.
   * @returns The token.
   */
  public get token(): string {
    const token = localStorage.getItem(this.tokenKey);

    if (!token) {
      throw new Error('No token found.');
    }

    return token;
  }

  /**
   * Get the session data from the current session.
   *
   * @throws Error if no token is found.
   * @returns The session data.
   * @see SessionModel
   */
  public get sessionData(): SessionModel {
    const payload = this.token.split('.')[1];
    const payloadDecoded = atob(payload);

    return JSON.parse(payloadDecoded);
  }

  /**
   * Initialize a new session with the given token.
   *
   * @param token The token to use for the new session.
   */
  public init(token: string): void {
    localStorage.setItem(this.tokenKey, token);

    this.goToHome();
  }

  /**
   * Close the current session and redirect to the login page.
   */
  public close(): void {
    localStorage.removeItem(this.tokenKey);

    this.goToLogin();
  }

  /**
   * Navigate to the login page.
   */
  public goToLogin(): void {
    this.router.navigate(['login']);
  }

  /**
   * Navigate to the home page.
   */
  public goToHome(): void {
    this.router.navigate(['']);
  }
}
