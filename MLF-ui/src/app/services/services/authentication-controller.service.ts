/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { AuthenticationResponse } from '../models/authentication-response';
import { confirm } from '../fn/authentication-controller/confirm';
import { Confirm$Params } from '../fn/authentication-controller/confirm';
import { loginUser } from '../fn/authentication-controller/login-user';
import { LoginUser$Params } from '../fn/authentication-controller/login-user';
import { logout } from '../fn/authentication-controller/logout';
import { Logout$Params } from '../fn/authentication-controller/logout';
import { MessageResponse } from '../models/message-response';
import { RefreshTokenResponse } from '../models/refresh-token-response';
import { refreshTokens } from '../fn/authentication-controller/refresh-tokens';
import { RefreshTokens$Params } from '../fn/authentication-controller/refresh-tokens';
import { registerUser } from '../fn/authentication-controller/register-user';
import { RegisterUser$Params } from '../fn/authentication-controller/register-user';
import { validateToken } from '../fn/authentication-controller/validate-token';
import { ValidateToken$Params } from '../fn/authentication-controller/validate-token';

@Injectable({ providedIn: 'root' })
export class AuthenticationControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `validateToken()` */
  static readonly ValidateTokenPath = '/api/auth/validate-token';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `validateToken()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  validateToken$Response(params: ValidateToken$Params, context?: HttpContext): Observable<StrictHttpResponse<MessageResponse>> {
    return validateToken(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `validateToken$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  validateToken(params: ValidateToken$Params, context?: HttpContext): Observable<MessageResponse> {
    return this.validateToken$Response(params, context).pipe(
      map((r: StrictHttpResponse<MessageResponse>): MessageResponse => r.body)
    );
  }

  /** Path part for operation `registerUser()` */
  static readonly RegisterUserPath = '/api/auth/register';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registerUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerUser$Response(params: RegisterUser$Params, context?: HttpContext): Observable<StrictHttpResponse<MessageResponse>> {
    return registerUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `registerUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerUser(params: RegisterUser$Params, context?: HttpContext): Observable<MessageResponse> {
    return this.registerUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<MessageResponse>): MessageResponse => r.body)
    );
  }

  /** Path part for operation `refreshTokens()` */
  static readonly RefreshTokensPath = '/api/auth/refresh';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `refreshTokens()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  refreshTokens$Response(params: RefreshTokens$Params, context?: HttpContext): Observable<StrictHttpResponse<RefreshTokenResponse>> {
    return refreshTokens(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `refreshTokens$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  refreshTokens(params: RefreshTokens$Params, context?: HttpContext): Observable<RefreshTokenResponse> {
    return this.refreshTokens$Response(params, context).pipe(
      map((r: StrictHttpResponse<RefreshTokenResponse>): RefreshTokenResponse => r.body)
    );
  }

  /** Path part for operation `logout()` */
  static readonly LogoutPath = '/api/auth/logout';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `logout()` instead.
   *
   * This method doesn't expect any request body.
   */
  logout$Response(params: Logout$Params, context?: HttpContext): Observable<StrictHttpResponse<MessageResponse>> {
    return logout(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `logout$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  logout(params: Logout$Params, context?: HttpContext): Observable<MessageResponse> {
    return this.logout$Response(params, context).pipe(
      map((r: StrictHttpResponse<MessageResponse>): MessageResponse => r.body)
    );
  }

  /** Path part for operation `loginUser()` */
  static readonly LoginUserPath = '/api/auth/login';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loginUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  loginUser$Response(params: LoginUser$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthenticationResponse>> {
    return loginUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `loginUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  loginUser(params: LoginUser$Params, context?: HttpContext): Observable<AuthenticationResponse> {
    return this.loginUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthenticationResponse>): AuthenticationResponse => r.body)
    );
  }

  /** Path part for operation `confirm()` */
  static readonly ConfirmPath = '/api/auth/activate-account';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `confirm()` instead.
   *
   * This method doesn't expect any request body.
   */
  confirm$Response(params: Confirm$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return confirm(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `confirm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  confirm(params: Confirm$Params, context?: HttpContext): Observable<void> {
    return this.confirm$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
