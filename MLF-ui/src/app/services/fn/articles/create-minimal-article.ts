/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ArticleResponse } from '../../models/article-response';
import { NonAttachedArticleRequest } from '../../models/non-attached-article-request';

export interface CreateMinimalArticle$Params {
      body: NonAttachedArticleRequest
}

export function createMinimalArticle(http: HttpClient, rootUrl: string, params: CreateMinimalArticle$Params, context?: HttpContext): Observable<StrictHttpResponse<ArticleResponse>> {
  const rb = new RequestBuilder(rootUrl, createMinimalArticle.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ArticleResponse>;
    })
  );
}

createMinimalArticle.PATH = '/articles/non-attached';
