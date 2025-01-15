/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { LearningPathRequest } from '../../models/learning-path-request';
import { LearningPathResponse } from '../../models/learning-path-response';

export interface CreateLearningPath$Params {
      body: LearningPathRequest
}

export function createLearningPath(http: HttpClient, rootUrl: string, params: CreateLearningPath$Params, context?: HttpContext): Observable<StrictHttpResponse<LearningPathResponse>> {
  const rb = new RequestBuilder(rootUrl, createLearningPath.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<LearningPathResponse>;
    })
  );
}

createLearningPath.PATH = '/api/learning-paths';
