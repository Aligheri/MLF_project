/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { RefreshTokenRequest } from '../../models/refresh-token-request';
import { RefreshTokenResponse } from '../../models/refresh-token-response';

export interface RefreshTokens$Params {
      body: RefreshTokenRequest
}

export function refreshTokens(http: HttpClient, rootUrl: string, params: RefreshTokens$Params, context?: HttpContext): Observable<StrictHttpResponse<RefreshTokenResponse>> {
  const rb = new RequestBuilder(rootUrl, refreshTokens.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<RefreshTokenResponse>;
    })
  );
}

refreshTokens.PATH = '/api/auth/refresh';
