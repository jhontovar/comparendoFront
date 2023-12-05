/**
 * Represents a session data of the user.
 */
export interface SessionModel {
  /**
   * The user id.
   */
  Id: string;

  /**
   * The user name.
   */
  sub: string;

  /**
   * The user email.
   */
  email: string;

  /**
   * JWT ID.
   */
  jti: string;

  /**
   * Not before.
   */
  nbf: number;

  /**
   * Expiration time.
   */
  exp: number;

  /**
   * Issued at.
   */
  iat: number;

  /**
   * Issuer.
   */
  iss: string;

  /**
   * Audience.
   */
  aud: string;
}
