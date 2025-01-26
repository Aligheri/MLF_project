/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ArticleResponse } from '../../models/article-response';

export interface GetArticlesByTopic$Params {
  topicId: number;
}

export function getArticlesByTopic(http: HttpClient, rootUrl: string, params: GetArticlesByTopic$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ArticleResponse>>> {
  const rb = new RequestBuilder(rootUrl, getArticlesByTopic.PATH, 'get');
  if (params) {
    rb.path('topicId', params.topicId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ArticleResponse>>;
    })
  );
}

getArticlesByTopic.PATH = '/articles/{topicId}/articles';
