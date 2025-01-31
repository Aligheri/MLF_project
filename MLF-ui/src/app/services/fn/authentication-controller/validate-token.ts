/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { MessageResponse } from '../../models/message-response';

export interface ValidateToken$Params {
      body: string
}

export function validateToken(http: HttpClient, rootUrl: string, params: ValidateToken$Params, context?: HttpContext): Observable<StrictHttpResponse<MessageResponse>> {
  const rb = new RequestBuilder(rootUrl, validateToken.PATH, 'post');
  if (params) {
    rb.body(params.body, 'text/plain');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<MessageResponse>;
    })
  );
}

validateToken.PATH = '/api/auth/validate-token';
