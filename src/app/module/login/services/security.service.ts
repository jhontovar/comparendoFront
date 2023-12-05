import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponseModel } from '../interfaces/login.response.model';

/**
 * Service to handle security-related operations.
 */
@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  /**
   * Constant to hold the base URL for the security API.
   */
  private readonly baseUrl = `${environment.apiDitra}/api/Security`;

  /**
   * Constructor of the class.
   *
   * @param httpClient The HTTP client to make API calls.
   */
  constructor(private httpClient: HttpClient) {}

  /**
   * Call the login API.
   *
   * @param username The username.
   * @param password The password.
   * @returns An observable with the login response.
   * @see LoginResponseModel
   * @see Observable
   */
  public login(
    username: string,
    password: string
  ): Observable<LoginResponseModel> {
    return this.httpClient
      .post(
        `${this.baseUrl}/Login`,
        {
          login: username,
          contrasena: password,
        },
        {
          responseType: 'text',
        }
      )
      .pipe(
        map((response) => {
          return {
            success: true,
            token: response,
          };
        }),
        catchError((error) => {
          console.log('An error occurred while logging in.', error);
          return of({
            success: false,
          });
        })
      );
  }
}
