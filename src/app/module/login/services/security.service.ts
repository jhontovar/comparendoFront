import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, mergeMap, of } from 'rxjs';
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
        mergeMap((token) => {
          return this.httpClient
            .get(`${environment.apiDitra}/api/AntiForgery`, {
              observe: 'response',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .pipe(
              map(() => ({
                success: true,
                token: token,
              }))
            );
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
