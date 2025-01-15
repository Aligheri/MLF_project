/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { LearningPath } from '../../models/learning-path';

export interface GetAllLearningPaths$Params {
}

export function getAllLearningPaths(http: HttpClient, rootUrl: string, params?: GetAllLearningPaths$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<LearningPath>>> {
  const rb = new RequestBuilder(rootUrl, getAllLearningPaths.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<LearningPath>>;
    })
  );
}

getAllLearningPaths.PATH = '/api/learning-paths';
