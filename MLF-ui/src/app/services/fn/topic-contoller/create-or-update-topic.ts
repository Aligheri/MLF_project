/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Topic } from '../../models/topic';

export interface CreateOrUpdateTopic$Params {
  path: string;
  learningPathId: number;
}

export function createOrUpdateTopic(http: HttpClient, rootUrl: string, params: CreateOrUpdateTopic$Params, context?: HttpContext): Observable<StrictHttpResponse<Topic>> {
  const rb = new RequestBuilder(rootUrl, createOrUpdateTopic.PATH, 'post');
  if (params) {
    rb.query('path', params.path, {});
    rb.path('learningPathId', params.learningPathId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Topic>;
    })
  );
}

createOrUpdateTopic.PATH = '/api/topics/{learningPathId}';
