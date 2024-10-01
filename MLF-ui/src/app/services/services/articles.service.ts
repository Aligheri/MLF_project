/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { archiveArticle } from '../fn/articles/archive-article';
import { ArchiveArticle$Params } from '../fn/articles/archive-article';
import { ArticleResponse } from '../models/article-response';
import { createArticle } from '../fn/articles/create-article';
import { CreateArticle$Params } from '../fn/articles/create-article';
import { deleteArticle } from '../fn/articles/delete-article';
import { DeleteArticle$Params } from '../fn/articles/delete-article';
import { deleteArticlesByTopic } from '../fn/articles/delete-articles-by-topic';
import { DeleteArticlesByTopic$Params } from '../fn/articles/delete-articles-by-topic';
import { getArticles } from '../fn/articles/get-articles';
import { GetArticles$Params } from '../fn/articles/get-articles';
import { getArticlesGroupedByTopic } from '../fn/articles/get-articles-grouped-by-topic';
import { GetArticlesGroupedByTopic$Params } from '../fn/articles/get-articles-grouped-by-topic';

@Injectable({ providedIn: 'root' })
export class ArticlesService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `archiveArticle()` */
  static readonly ArchiveArticlePath = '/articles/archive/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `archiveArticle()` instead.
   *
   * This method doesn't expect any request body.
   */
  archiveArticle$Response(params: ArchiveArticle$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return archiveArticle(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `archiveArticle$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  archiveArticle(params: ArchiveArticle$Params, context?: HttpContext): Observable<void> {
    return this.archiveArticle$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `createArticle()` */
  static readonly CreateArticlePath = '/articles';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createArticle()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createArticle$Response(params: CreateArticle$Params, context?: HttpContext): Observable<StrictHttpResponse<ArticleResponse>> {
    return createArticle(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createArticle$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createArticle(params: CreateArticle$Params, context?: HttpContext): Observable<ArticleResponse> {
    return this.createArticle$Response(params, context).pipe(
      map((r: StrictHttpResponse<ArticleResponse>): ArticleResponse => r.body)
    );
  }

  /** Path part for operation `getArticles()` */
  static readonly GetArticlesPath = '/articles/my-articles';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getArticles()` instead.
   *
   * This method doesn't expect any request body.
   */
  getArticles$Response(params?: GetArticles$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ArticleResponse>>> {
    return getArticles(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getArticles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getArticles(params?: GetArticles$Params, context?: HttpContext): Observable<Array<ArticleResponse>> {
    return this.getArticles$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ArticleResponse>>): Array<ArticleResponse> => r.body)
    );
  }

  /** Path part for operation `getArticlesGroupedByTopic()` */
  static readonly GetArticlesGroupedByTopicPath = '/articles/my-articles-by-topic';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getArticlesGroupedByTopic()` instead.
   *
   * This method doesn't expect any request body.
   */
  getArticlesGroupedByTopic$Response(params?: GetArticlesGroupedByTopic$Params, context?: HttpContext): Observable<StrictHttpResponse<{
[key: string]: Array<ArticleResponse>;
}>> {
    return getArticlesGroupedByTopic(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getArticlesGroupedByTopic$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getArticlesGroupedByTopic(params?: GetArticlesGroupedByTopic$Params, context?: HttpContext): Observable<{
[key: string]: Array<ArticleResponse>;
}> {
    return this.getArticlesGroupedByTopic$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
[key: string]: Array<ArticleResponse>;
}>): {
[key: string]: Array<ArticleResponse>;
} => r.body)
    );
  }

  /** Path part for operation `deleteArticle()` */
  static readonly DeleteArticlePath = '/articles/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteArticle()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteArticle$Response(params: DeleteArticle$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteArticle(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteArticle$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteArticle(params: DeleteArticle$Params, context?: HttpContext): Observable<void> {
    return this.deleteArticle$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `deleteArticlesByTopic()` */
  static readonly DeleteArticlesByTopicPath = '/articles/delete-by-topic';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteArticlesByTopic()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteArticlesByTopic$Response(params: DeleteArticlesByTopic$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteArticlesByTopic(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteArticlesByTopic$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteArticlesByTopic(params: DeleteArticlesByTopic$Params, context?: HttpContext): Observable<void> {
    return this.deleteArticlesByTopic$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
