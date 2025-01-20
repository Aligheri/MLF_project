/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { TopicResponse } from '../../models/topic-response';

export interface GetAllTopics$Params {
}

export function getAllTopics(http: HttpClient, rootUrl: string, params?: GetAllTopics$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<TopicResponse>>> {
  const rb = new RequestBuilder(rootUrl, getAllTopics.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<TopicResponse>>;
    })
  );
}

getAllTopics.PATH = '/api/topics/topics';
