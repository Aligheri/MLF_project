/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { MessageResponse } from '../../models/message-response';
import { RegisterRequest } from '../../models/register-request';

export interface RegisterUser$Params {
      body: RegisterRequest
}

export function registerUser(http: HttpClient, rootUrl: string, params: RegisterUser$Params, context?: HttpContext): Observable<StrictHttpResponse<MessageResponse>> {
  const rb = new RequestBuilder(rootUrl, registerUser.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<MessageResponse>;
    })
  );
}

registerUser.PATH = '/api/auth/register';
