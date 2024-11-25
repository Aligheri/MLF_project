/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ArticleResponse } from '../../models/article-response';

export interface GetArticlesGroupedByTopic$Params {
}

export function getArticlesGroupedByTopic(http: HttpClient, rootUrl: string, params?: GetArticlesGroupedByTopic$Params, context?: HttpContext): Observable<StrictHttpResponse<{
[key: string]: Array<ArticleResponse>;
}>> {
  const rb = new RequestBuilder(rootUrl, getArticlesGroupedByTopic.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      [key: string]: Array<ArticleResponse>;
      }>;
    })
  );
}

getArticlesGroupedByTopic.PATH = '/articles/my-articles-by-topic';
