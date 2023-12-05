/**
 * A model for an individual login response.
 */
export interface LoginResponseModel {
  /**
   * The success status of the login attempt.
   *
   * @example true
   */
  success: boolean;

  /**
   * The token to use for subsequent API calls.
   * This is only present if the login attempt was successful.
   */
  token?: string;
}
