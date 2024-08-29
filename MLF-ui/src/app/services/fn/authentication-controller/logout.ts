/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { MessageResponse } from '../../models/message-response';

export interface Logout$Params {
  Authorization: string;
}

export function logout(http: HttpClient, rootUrl: string, params: Logout$Params, context?: HttpContext): Observable<StrictHttpResponse<MessageResponse>> {
  const rb = new RequestBuilder(rootUrl, logout.PATH, 'post');
  if (params) {
    rb.header('Authorization', params.Authorization, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<MessageResponse>;
    })
  );
}

logout.PATH = '/api/auth/logout';
