/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map} from 'rxjs/operators';
import {StrictHttpResponse} from '../../strict-http-response';
import {AuthenticationResponse} from '../../models/authentication-response';
import {LoginRequest} from '../../models/login-request';

export interface LoginUser$Params {
  body: LoginRequest
}
export function loginUser(
  http: HttpClient,
  rootUrl: string,
  params: LoginUser$Params,
  context?: HttpContext
): Observable<StrictHttpResponse<AuthenticationResponse>> {
  return http.post<AuthenticationResponse>(
    `${rootUrl}${loginUser.PATH}`,
    params.body,
    {
      observe: 'response',
      withCredentials: true,
      responseType: 'json',
      context
    }
  ).pipe(
    map(response => response as StrictHttpResponse<AuthenticationResponse>)
  );
}
loginUser.PATH = '/api/auth/login';
