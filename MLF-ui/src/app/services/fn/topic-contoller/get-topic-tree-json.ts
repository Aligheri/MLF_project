/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface GetTopicTreeJson$Params {
  learningPathId: number;
}

export function getTopicTreeJson(http: HttpClient, rootUrl: string, params: GetTopicTreeJson$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
  const rb = new RequestBuilder(rootUrl, getTopicTreeJson.PATH, 'get');
  if (params) {
    rb.path('learningPathId', params.learningPathId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<string>;
    })
  );
}

getTopicTreeJson.PATH = '/api/topics/{learningPathId}/tree';
