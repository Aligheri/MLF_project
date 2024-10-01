/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ArticleRequest } from '../../models/article-request';
import { ArticleResponse } from '../../models/article-response';

export interface CreateArticle$Params {
      body: ArticleRequest
}

export function createArticle(http: HttpClient, rootUrl: string, params: CreateArticle$Params, context?: HttpContext): Observable<StrictHttpResponse<ArticleResponse>> {
  const rb = new RequestBuilder(rootUrl, createArticle.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ArticleResponse>;
    })
  );
}

createArticle.PATH = '/articles';